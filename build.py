from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED
from base64 import b64encode
import re
root=Path(__file__).resolve().parent
bindings={'C':'const {Echo,move,collected,circleRect}=Source;\n','Art':'const {chapters,palettes,visible}=C;\n'}
def module(filename,binding=None):
    source=(root/filename).read_text(encoding='utf-8-sig')
    exports=re.findall(r'^export (?:function|class|const) (\w+)',source,re.M)
    source=re.sub(r'^import .*;\n','',source,flags=re.M)
    source=re.sub(r'^export ','',source,flags=re.M)
    if binding:
        return f"const {binding}=(()=>{{\n{bindings.get(binding,'')}{source}\nreturn {{{','.join(exports)}}};}})();\n"
    return source
script=''.join(module(f,b) for f,b in [('echo-source.mjs','Source'),('core.mjs','C'),('art.mjs','Art'),('audio.mjs','AudioKit'),('sdk.mjs','SDK')])
script+='const {GlenView}=Art,{RushAudio}=AudioKit,{bridge}=SDK;\n'+module('app.mjs')
html=(root/'index-source.html').read_text(encoding='utf-8-sig')
html=html.replace('href="icon.svg"','href="data:image/svg+xml;base64,'+b64encode((root/'icon.svg').read_bytes()).decode()+'"')
html=html.replace('<link rel="stylesheet" href="style.css">','<style>'+(root/'style.css').read_text()+'</style>')
html=html.replace('<script src="vendor/three.min.js"></script>','<script>/*'+(root/'vendor/THREE-LICENSE.txt').read_text()+'*/\n'+(root/'vendor/three.min.js').read_text()+'</script>')
html=html.replace('<script type="module" src="app.mjs"></script>','<script>(()=>{\n'+script+'\n})();</script>')
for name in ['index.html','standalone.html']:(root/name).write_text(html,encoding='utf-8',newline='\n')
archive_path=root.parent/'HUSHWING.zip'
files=sorted(p for p in root.rglob('*') if p.is_file())
with ZipFile(archive_path,'w',ZIP_DEFLATED,compresslevel=9) as archive:
    for f in files:archive.write(f,f.relative_to(root).as_posix())
with ZipFile(archive_path) as archive:
    assert archive.testzip() is None
    assert archive.read('index.html')==archive.read('standalone.html')
    assert all(archive.read(p.relative_to(root).as_posix())==p.read_bytes() for p in files)
print(f'{archive_path.name}: {archive_path.stat().st_size:,} bytes, {len(files)} files')
