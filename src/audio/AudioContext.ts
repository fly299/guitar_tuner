export let audioContext: AudioContext | null = null;
export let analyser: AnalyserNode | null = null;

export async function startAudio() {
    if(!audioContext){
        audioContext = new window.AudioContext();
    }

    if(audioContext.state === 'suspended'){
        await audioContext.resume();
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({audio:true});
        const source = audioContext.createMediaStreamSource(stream);

        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;

        source.connect(analyser);
        console.log('Mic connected');
        return true;
        
    } catch (err){
        console.error('Error accessing microphone:', err);
        return false;
    }
}