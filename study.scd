SynthDef("test", {
	arg freq = 330, amp_cord = 0.08, amp_wn = 0.54, mix_waving = 1.0;
	var note = cpsmidi(freq);
	var a = SinOsc.ar(midicps(note + 0)) + LFTri.ar(midicps(note - 24));
	var b = SinOsc.ar(midicps(note + 4));
	var c = SinOsc.ar(midicps(note + 7));
	var d = SinOsc.ar(midicps(note + 11));
	var wn = PinkNoise.ar(2.0);

	var ftoval = (freq - 100) / (400 - 100);
	//(value - from1) / (to1 - from1) * (to2 - from2) + from2;

	var lc = HPF.ar(wn, 250);
	var pf = LPF.ar(lc, freq * 2, 1.5 - ftoval) + HPF.ar(wn, freq * 2, ftoval * 0.5);
	var ns_base = (SinOsc.ar(0.08, 0.4, 0.5) + 0.5) *
	(SinOsc.ar(0.055, 0.5, 0.1) + 0.9) *
	(SinOsc.ar(0.03, 0.2, 0.1) + 0.9);
	var ns = (ns_base * mix_waving) + (1.0 - mix_waving);

	var wave = ((a + b + c + d) * amp_cord * ns + (pf * amp_wn) * ns);
	var out = FreeVerb.ar(wave, 0.43, 0.8, 0.3, 1, 0) * 1.0;
	Out.ar(0, [out, out]);

}).add


//等比的に上昇
(
Routine({
    var freq, amp, sustain;
    loop{
        freq = [60,61,62,63,64,65,66,67,68,69,70,71].choose.midicps;
        amp = exprand(0.1, 0.5);
        sustain = rrand(1, 4) * 0.5;
        Synth("singrain", ["freq", freq, "amp", amp, "sustain", sustain]);
        (sustain * 0.8).yield;
    }
}).play;
)

(
SynthDef("foolin", {
	arg freq = 440, numharm = 200;

	var out, perc_b;

	perc_b = LFTri.ar(1);

	out = Saw.ar(440, 0.5) * perc_b;

	Out.ar(0, [out, out]);
}).add
)

SynthDef("Synth", {

	arg pan = 0.5, vol = 0.0, vol_ten = 0.0,
	freq_1 = 400,
	freq_2 = 450,
	freq_3 = 500,
	freq_4 = 600,
	mix_1 = 0.1,
	mix_2 = 0.1,
	mix_3 = 0.1,
	mix_4 = 0.1,
	pm_a = 0.0, pm_b = 0.0, pm_c = 0.0, pm_d = 0.0;

	var out_1, out_2, out_3, out_4, out_l, out_r;
	var left, right;
	var wn;

	var perc_a, perc_b, perc_c, perc_d, perc;
	var poa, pob, poc, pod;

	freq_2 = midicps(cpsmidi(freq_1) + 4 + 12);
	freq_3 = midicps(cpsmidi(freq_1) + 7);
	freq_4 = midicps(cpsmidi(freq_1) + 11 + 12);

	//Percs
	//A:カタカタ
	//B:Blip
	//C:ハーモニカ
	//D:ホワイトノイズ
	perc_a = WhiteNoise.ar(5, 0);
	perc_a = RHPF.ar(perc_a, freq_1 * 10, 0.2, 1, 0);
	perc_a = perc_a * (Blip.ar(freq_3 / 105.0, 2, 2, 0)) * 0.5;
	perc_a = perc_a * Pulse.ar(freq_3 / 20.0, 0.5, 1, 0) * 0.5;

	perc_b = Blip.ar(freq_1 * 2, 2000, 10, 0);
	perc_b = perc_b + Blip.ar(freq_1 * 1 + 5, 2000, 10, 0);
	perc_b = perc_b * Blip.ar(freq_3 / 2.0, 2000, 10, 0) * 0.3;

	perc_c = Blip.ar(freq_1 * 1, 2000, 10, 0);
	perc_c = perc_c + Blip.ar(freq_2 * 1 + 5, 2000, 6, 0);
	perc_c = perc_c + Blip.ar(freq_3 * 1 + 5, 2000, 6, 0);
	perc_c = perc_c + Blip.ar(freq_2 + 3, 2000, 6, 0);
	perc_c = perc_c + Blip.ar(freq_3 + 3, 2000, 6, 0);
	perc_c = perc_c * (2.0 + Blip.ar(freq_3, 1020, 2, 0));
	perc_c = perc_c * Pulse.ar(freq_3 / 30.0, 0.5, 2, 0);
	perc_c = perc_c * Pulse.ar(freq_3 / 35.0, 0.5, 2, 0);
	perc_c = perc_c * Pulse.ar(freq_3 / 37.0, 0.5, 2, 0);
	perc_c = perc_c * 0.1;

	perc_d = PinkNoise.ar(9, 0);
	perc_d = perc_d * (0.5 + Blip.ar(freq_3 * 10.0, 20, 1, 0));
	perc_d = perc_d * Pulse.ar(freq_1, 0.5, 2, 0);
	perc_d = perc_d * Pulse.ar(freq_2, 0.5, 2, 0);
	perc_d = RHPF.ar(perc_d, freq_1 * 10, 0.1, 1, 0);
	perc_d = perc_d * Pulse.ar(freq_3, 0.5, 2, 0) * 0.5;

	poa = perc_a * pm_a;
	pob = perc_b * pm_b;
	poc = perc_c * pm_c;
	pod = perc_d * pm_d;
	perc = poa + pob + poc + pod;

	out_1 = SinOsc.ar(freq_1, 0.2, 1, 0);
	out_1 = SinOsc.ar(freq_1 / 2.0, 0.2, 1, 0) + out_1;
	out_1 = LFTri.ar(freq_1 + 1, 0, 0.6) + out_1;
	out_1 = LFTri.ar (freq_1 * 0.01, 0.2, 0.4, 0) + out_1;
	out_1 = Pulse.ar(freq_1 - 0.03, 0.5, 1.4, 0) + out_1;

	out_2 = SinOsc.ar(freq_2, 0.2, 1, 0);
	out_2 = SinOsc.ar(freq_2 / 2.0, 0.2, 1, 0) + out_2;
	out_2 = LFTri.ar (freq_2 + 1, 0, 0.6) + out_2;
	out_2 = LFTri.ar (freq_2 * 0.01, 0.2, 0.4, 0) + out_2;
	out_2 = Pulse.ar(freq_2 - 0.04, 0.5, 0.2, 0) + out_2;

	out_3 = SinOsc.ar(freq_3, 0.2, 1, 0);
	out_3 = LFTri.ar (freq_3 + 1, 0, 0.6) + out_3;
	out_3 = Pulse.ar(freq_3 - 0.03, 0.5, 0.2, 0) + out_3;
	out_3 = Pulse.ar (freq_3 * 0.01, 0.2, 0.4, 0) + out_3;

	out_4 = SinOsc.ar(freq_4, 0.2, 0.5, 0);
	out_4 = LFTri.ar (freq_4 + 1, 0, 0.3) + out_4;
	out_4 = Pulse.ar(freq_4, 0.1, 0.2, 0) + out_4;
	out_4 = Pulse.ar (freq_4 * 0.003, 0.2, 0.9, 0) + out_4;

	out_1 = out_1 * mix_4;
	out_2 = out_2 * mix_3;
	out_3 = out_3 * mix_2;
	out_4 = out_4 * mix_1 * 0.6;

	out_l = out_1 + out_2 + perc;
	out_r = out_3 + out_4 + perc;

	out_l = out_l * 0.5 + out_r * 0.3;
	out_r = out_r * 0.5 + out_l * 0.3;

	//Reverb
	left  = FreeVerb.ar(out_l, 0.43, 10.9, 0.7, 1, 0) * 1.0;
	right = FreeVerb.ar(out_r, 0.43, 10.9, 0.7, 1, 0) * 1.0;

	Out.ar(0, [left  * vol * pan, right * vol * (1.0 - pan)]);
	Out.ar(2, left  * vol_ten);
	Out.ar(3, left  * vol_ten);
	Out.ar(4, right  * vol_ten);
	Out.ar(5, right  * vol_ten);
}).add