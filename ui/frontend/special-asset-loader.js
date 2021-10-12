const path = require('path');
const { hashElement } = require('folder-hash');
const { copy } = require('fs-extra');

module.exports = async (source) => {
    const p = path.resolve(__dirname, source.trim());
    const { hash } = await hashElement(p);
    const urlh = hash.replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '');
    const name = `${path.basename(p)}-${urlh}`;
    await copy(p, path.resolve(__dirname, 'build', 'assets', name));
    return `export default "${name}"`;
};
