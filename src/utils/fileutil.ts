const mimeMap = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
};

export function getMimeFromFilename(filename): string {
    const ext = filename.split('.').pop().toLowerCase();
    if (mimeMap[ext])
        return mimeMap[ext]

    return mimeMap['png'];
}

export async function getBlob(canvas: HTMLCanvasElement, mime: string): Promise<Blob> {
    return new Promise(resolve => {
        canvas.toBlob((blob) => {
            resolve(blob);
        }, mime);
    });
}
