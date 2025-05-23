import {Image} from "canvas";

/**
 * [en] item options
 *      x & width is optional
 *
 * [zh] 分割项
 *      x 和 width 为可选项
 *
 */
export type ImgSplitItemOption = {
    x?: number,
    y: number,
    width?: number,
    height: number
}

/**
 * [en] ImgSplitOption
 *
 * [zh] 分割参数
 *
 */
export type ImgSplitOption = {
    src: Buffer | string
    height?: number,
    count?: number,
    forceOuputDataURL?: boolean,
    items?: ImgSplitItemOption[]
}
/**
 * [en] ouputdata
 *
 * [zh] 输出结果
 *
 */
export type ouputDataType = ImgSplitItemOption & {
    dataURL?: string,
    blob?: Blob,
    buffer?: Buffer,
}

export * from './imgsplit';