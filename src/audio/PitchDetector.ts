export function autoCorrelate(buffer: Float32Array, sampleRate: number): number {
    let SIZE = buffer.length
    let sumOfSquares = 0

    for(let i = 0; i < SIZE; i++){
        sumOfSquares += buffer[i]! * buffer[i]!
    }

    const rootMeanSquare = Math.sqrt(sumOfSquares / SIZE)
    if(rootMeanSquare < 0.01) return -1

    let r1 = 0
    let r2 = SIZE - 1
    const threshold = 0.2

    for(let i = 0; i < SIZE / 2; i++){
        if(Math.abs(buffer[i]!) < threshold){
            r1 = i; break;
        }
    }
    for(let i = 1; i < SIZE / 2; i++){
        if(Math.abs(buffer[SIZE - i]!) < threshold){
            r2 = SIZE - i; break;
        }
    }

    buffer = buffer.slice(r1, r2)
    SIZE = buffer.length
    const c = new Array(SIZE).fill(0)

    for(let i = 0; i < SIZE; i++){
        for(let j = 0; j < SIZE - i; j++){
            c[i] = c[i] + buffer[j]! * buffer[j + i]!
        }
    }

    let d = 0
    while(c[d] > c[d + 1]) d++
    let maxval = -1
    let maxpos = -1
    for(let i = d; i < SIZE; i++){
        if(c[i] > maxval){
            maxval = c[i]; maxpos = i
        }
    }
    return sampleRate / maxpos
}