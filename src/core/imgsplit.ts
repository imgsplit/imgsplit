import {createCanvas, Image, loadImage} from "canvas";
import {ImgSplitItemOption, ImgSplitOption, ouputDataType} from "./index";


/**
 * [en] image split
 *
 * [zh] 图片分割
 *
 * @param options - [en] image or options
 * @param options - [zh] 图片或选项
 *
 * @param height - [en] item height
 * @param height - [zh] 分割高度
 */
export async function imgsplit(
    options: ImgSplitOption | string,
    height: number = 256
): Promise<ouputDataType[]> {
    let ops: ImgSplitOption;

    if ((typeof options) === 'object') {
        ops = options as ImgSplitOption;
    } else {
        ops = {
            src: options as string,
            height: height
        }
    }

    if ((typeof ops.src) === 'string') {
        ops.src = await loadImage(ops.src,{
            crossOrigin:'anonymous'
        });
    }

    const distImgArr: ouputDataType[] = [];
    if (ops.height || ops.count) {
        if (ops.count) {
            ops.height = Math.ceil(ops.src.height / ops.count);
        }

        ops.items = [];
        for (let y = 0; y < ops.src.height; y += ops.height) {
            const item: ImgSplitItemOption = {
                y: y,
                height: ops.height
            };
            if (item.y + item.height > ops.src.height) {
                item.height = ops.src.height - item.y;
            }
            ops.items.push(item);
        }
    }

    // fill x & width
    for (let i = 0; i < ops.items.length; i++) {
        ops.items[i].x = ops.items[i].x || 0;
        ops.items[i].width = ops.items[i].width || ops.src.width;
    }


    for (let i = 0; i < ops.items.length; i++) {
        const canvas = createCanvas(ops.items[i].width, ops.items[i].height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(ops.src, -ops.items[i].x, -ops.items[i].y);

        const result: ouputDataType = {
            dataURL: canvas.toDataURL(),
            x: ops.items[i].x,
            y: ops.items[i].y,
            width: ops.items[i].width,
            height: ops.items[i].height,
        }

        if (canvas.toBuffer)
            result.buffer = canvas.toBuffer();

        distImgArr.push(result);
    }


    return distImgArr;
}

