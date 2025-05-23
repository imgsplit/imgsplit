export async function getBlob(canvas: HTMLCanvasElement): Promise<Blob> {
    return new Promise(resolve => {
        canvas.toBlob((blob) => {
            resolve(blob);
        });
    });
}
