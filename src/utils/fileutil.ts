import {FileTypeResult} from "file-type";

export async function getMimeFromFilename(asset: string | Buffer): Promise<string> {
    let mime = 'image/png';

    if (typeof (asset) === 'string') {
        let fileType: FileTypeResult;

        if (isBrowser()) {
            const {fileTypeFromStream} = await import('file-type')

            const response = await fetch(asset);
            fileType = await fileTypeFromStream(response.body);
        } else {
            const {fileTypeFromFile} = await import('file-type')
            fileType = await fileTypeFromFile(asset);
        }
        mime = fileType.mime || mime;
    } else {
        const {fileTypeFromBuffer} = await import('file-type')
        mime = (await fileTypeFromBuffer(asset)).mime || mime;
    }
    return mime;

}

export async function getBlob(canvas: HTMLCanvasElement, mime: string): Promise<Blob> {
    return new Promise(resolve => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, mime);
    });
}

function isBrowser() {
    return !!(typeof window !== 'undefined' && window.document);
}