// 摘自 http://hackll.com/2015/11/19/debounce-and-throttle/
/**
 *
 * @param fn {Function}   实际要执行的函数
 * @param delay {Number}  执行间隔，单位是毫秒（ms）
 *
 * @return {Function}     返回一个“节流”函数
 */


declare global {
    interface Window {
        timer?: number;
    }
}

export function throttle(fn: Function, threshold = 500) {
    let last: number,
        timer: number,
        g = window || global;
    // 返回的函数，每过 threshold 毫秒就执行一次 fn 函数
    return (...args: any[]) => {
        g.clearTimeout(timer);
        const now = Date.now();
        // 如果距离上次执行 fn 函数的时间小于 threshold，那么就放弃
        // 执行 fn，并重新计时
        if (last && now < last + threshold) {
            // 保证在当前时间区间结束后，再执行一次 fn
            timer = g.setTimeout(() => {
                last = now;
                fn(...args);
            }, threshold);
            // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
        } else {
            last = now;
            fn(...args);
        }
    };
}