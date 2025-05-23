import {createCanvas, Image, loadImage} from "canvas";
import {ImgSplitItemOption, ImgSplitOption, ouputDataType} from "./index";
import {getBlob} from "../utils/fileutil";

const defaultOption: Partial<ImgSplitOption> = {
    forceOuputDataURL: true,
    height: 256
}

/**
 * [en] image split
 *
 * [zh] 图片分割
 *
 * @param imgurl - [en] image URL
 * @param imgurl - [zh] 图片地址
 *
 * @param height - [en] item height
 * @param height - [zh] 分割高度
 */
export async function imgsplit(imgurl: string, height?: number): Promise<ouputDataType[]>;

/**
 * [en] image split
 *
 * [zh] 图片分割
 *
 * @param buffer - [en] buffer
 * @param buffer - [zh] buffer
 *
 * @param height - [en] item height
 * @param height - [zh] 分割高度
 */
export async function imgsplit(buffer: Buffer, height?: number): Promise<ouputDataType[]>;
/**
 * [en] image split
 *
 * [zh] 图片分割
 *
 * @param options - [en] options
 * @param options - [zh] 选项
 */
export async function imgsplit(options: ImgSplitOption): Promise<ouputDataType[]>;


export async function imgsplit(
    options: ImgSplitOption | Buffer | string,
    height: number = 256
): Promise<ouputDataType[]> {
    let ops: ImgSplitOption;

    if ((typeof options) === 'object' && options.hasOwnProperty('src')) {
        ops = options as ImgSplitOption;
    } else {
        ops = {
            ...defaultOption,
            src: options as (string | Buffer),
            height: height
        }
    }

    let srcImage: Image = await loadImage(ops.src, {
        crossOrigin: 'anonymous'
    });

    const distImgArr: ouputDataType[] = [];
    if (!ops.items && (ops.height || ops.count)) {
        if (!ops.height && ops.count) {
            ops.height = Math.ceil(srcImage.height / ops.count);
        }

        ops.items = [];
        for (let y = 0; y < srcImage.height; y += ops.height) {
            const item: ImgSplitItemOption = {
                y: y,
                height: ops.height
            };
            if (item.y + item.height > srcImage.height) {
                item.height = srcImage.height - item.y;
            }
            ops.items.push(item);
        }
    }

    // fill x & width
    for (let i = 0; i < ops.items.length; i++) {
        ops.items[i].x = ops.items[i].x || 0;
        ops.items[i].width = ops.items[i].width || srcImage.width;
    }


    for (let i = 0; i < ops.items.length; i++) {
        const canvas = createCanvas(ops.items[i].width, ops.items[i].height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(srcImage, -ops.items[i].x, -ops.items[i].y);

        const result: ouputDataType = {
            x: ops.items[i].x,
            y: ops.items[i].y,
            width: ops.items[i].width,
            height: ops.items[i].height,
        }
        let hasOtherOutput = false;

        if (canvas.toBuffer) {
            result.buffer = canvas.toBuffer();
            hasOtherOutput = true;
        }

        if (canvas['toBlob']) {
            result.blob = await getBlob(canvas as any);
            hasOtherOutput = true;
        }

        if (ops.forceOuputDataURL || !hasOtherOutput) {
            result.dataURL = canvas.toDataURL();
        }


        distImgArr.push(result);
    }


    return distImgArr;
}