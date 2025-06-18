// 動態生成輸入欄位
function updateFields() {
    const formula = document.getElementById("formula").value;
    const inputFields = document.getElementById("inputFields");
    inputFields.innerHTML = "";

    const addInput = (label, id, unit) => {
        inputFields.innerHTML += `<label>${label} ${unit}:</label>
                                  <input type="number" id="${id}"><br>`;
    };

    switch (formula) {
        case "ohm":
            addInput("電壓", "voltage", "(V)");
            addInput("電流", "current", "(A)");
            break;
        case "power":
            addInput("電壓", "voltage", "(V)");
            addInput("電流", "current", "(A)");
            break;
        case "resistance_series":
            addInput("電阻 R₁", "r1", "(Ω)");
            addInput("電阻 R₂", "r2", "(Ω)");
            break;
        case "resistance_parallel":
            addInput("電阻 R₁", "r1", "(Ω)");
            addInput("電阻 R₂", "r2", "(Ω)");
            break;
        case "capacitor_charge":
            addInput("電容值 C", "capacitance", "(F)");
            addInput("電壓 V", "voltage", "(V)");
            break;
        case "inductor_voltage":
            addInput("電感值 L", "inductance", "(H)");
            addInput("電流變化率 dI/dt", "currentChange", "(A/s)");
            break;
        case "coulomb_law":
            addInput("電荷 q₁", "q1", "(C)");
            addInput("電荷 q₂", "q2", "(C)");
            addInput("距離 r", "distance", "(m)");
            break;
        case "capacitance_series":
            addInput("電容 C₁", "c1", "(F)");
            addInput("電容 C₂", "c2", "(F)");
            break;
        case "capacitance_parallel":
            addInput("電容 C₁", "c1", "(F)");
            addInput("電容 C₂", "c2", "(F)");
            break;
        case "inductance_series":
            addInput("電感 L₁", "l1", "(H)");
            addInput("電感 L₂", "l2", "(H)");
            break;
        case "inductance_parallel":
            addInput("電感 L₁", "l1", "(H)");
            addInput("電感 L₂", "l2", "(H)");
            break;
        case "ac_rms":
            addInput("峰值電壓 V₍pk₎", "vpeak", "(V)");
            break;
        case "resistance_temperature":
            addInput("初始電阻 R₀", "r0", "(Ω)");
            addInput("溫度變化 ΔT", "deltaT", "(°C)");
            addInput("溫度係數 α", "alpha", "");
            break;
            case "magnetic_field":
            addInput("電流 I", "I", "(A)");
            addInput("距離 r", "r", "(m)");
            break;

        case "faraday_law":
            addInput("線圈匝數 N", "N", "");
            addInput("磁通變化率 dΦ/dt", "dPhiDt", "(Wb/s)");
            break;

        case "electric_energy":
            addInput("電容 C", "C", "(F)");
            addInput("電壓 V", "V", "(V)");
            break;

        case "current_density":
            addInput("電流 I", "I", "(A)");
            addInput("截面積 A", "A", "(m²)");
            break;

        case "voltage_divider":
            addInput("輸入電壓 Vin", "Vin", "(V)");
            addInput("電阻 R₁", "R1", "(Ω)");
            addInput("電阻 R₂", "R2", "(Ω)");
            break;
        case "three_phase_power":
            addInput("線電壓 V<sub>line</sub>", "vLine", "(V)");
            addInput("線電流 I<sub>line</sub>", "iLine", "(A)");
            addInput("功率因數 cos(θ)", "cosTheta", "");
            break;
    
        case "three_phase_voltage_star":
            addInput("線電壓 V<sub>line</sub>", "vLine", "(V)");
            break;
    
        case "three_phase_voltage_delta":
            addInput("相電壓 V<sub>ph</sub>", "vPhase", "(V)");
            break;
    
        case "three_phase_current_star":
            addInput("線電流 I<sub>line</sub>", "iLine", "(A)");
            break;
    
        case "three_phase_current_delta":
            addInput("相電流 I<sub>ph</sub>", "iPhase", "(A)");
            break;
    }
}

function calculate() {
    const formula = document.getElementById("formula").value;
    let result = "";
    let steps = "";

    try {
        switch (formula) {
            case "ohm":
                const V = parseFloat(document.getElementById("voltage").value);
                const I = parseFloat(document.getElementById("current").value);
                if (!V || !I) throw "請輸入有效數值！";
                const R = V / I;
                result = `電阻值: ${R.toFixed(2)} Ω`;
                steps = `R = V / I = ${V}V / ${I}A = ${R.toFixed(2)} Ω`;
                break;

            case "power":
                const VP = parseFloat(document.getElementById("voltage").value);
                const IP = parseFloat(document.getElementById("current").value);
                if (!VP || !IP) throw "請輸入有效數值！";
                const P = VP * IP;
                result = `功率: ${P.toFixed(2)} W`;
                steps = `P = V × I = ${VP}V × ${IP}A = ${P.toFixed(2)} W`;
                break;

            case "resistance_series":
                const R1 = parseFloat(document.getElementById("r1").value);
                const R2 = parseFloat(document.getElementById("r2").value);
                if (!R1 || !R2) throw "請輸入有效數值！";
                const Rt_series = R1 + R2;
                result = `總電阻 (串聯): ${Rt_series.toFixed(2)} Ω`;
                steps = `Rₜ = R₁ + R₂ = ${R1}Ω + ${R2}Ω = ${Rt_series.toFixed(2)} Ω`;
                break;

            case "resistance_parallel":
                const R1P = parseFloat(document.getElementById("r1").value);
                const R2P = parseFloat(document.getElementById("r2").value);
                if (!R1P || !R2P) throw "請輸入有效數值！";
                const Rt_parallel = 1 / (1 / R1P + 1 / R2P);
                result = `總電阻 (並聯): ${Rt_parallel.toFixed(2)} Ω`;
                steps = `1/Rₜ = 1/R₁ + 1/R₂ → Rₜ ≈ ${Rt_parallel.toFixed(2)} Ω`;
                break;

            case "capacitor_charge":
                const C = parseFloat(document.getElementById("capacitance").value);
                const VC = parseFloat(document.getElementById("voltage").value);
                if (!C || !VC) throw "請輸入有效數值！";
                const Q = C * VC;
                result = `電荷量: ${Q.toFixed(6)} C`;
                steps = `Q = C × V = ${C}F × ${VC}V = ${Q.toFixed(6)} C`;
                break;

            case "inductor_voltage":
                const L = parseFloat(document.getElementById("inductance").value);
                const dIdt = parseFloat(document.getElementById("currentChange").value);
                if (!L || !dIdt) throw "請輸入有效數值！";
                const VL = L * dIdt;
                result = `感應電壓: ${VL.toFixed(2)} V`;
                steps = `V = L × dI/dt = ${L}H × ${dIdt}A/s = ${VL.toFixed(2)} V`;
                break;

            case "coulomb_law":
                const q1 = parseFloat(document.getElementById("q1").value);
                const q2 = parseFloat(document.getElementById("q2").value);
                const r = parseFloat(document.getElementById("distance").value);
                const k = 8.99e9;
                if (!q1 || !q2 || !r) throw "請輸入有效數值！";
                const F = (k * q1 * q2) / (r * r);
                result = `庫侖力: ${F.toExponential(2)} N`;
                steps = `F = k × q₁ × q₂ / r² = (8.99 × 10⁹ × ${q1} × ${q2}) / (${r}²) = ${F.toExponential(2)} N`;
                break;

            case "capacitance_series":
                const C1S = parseFloat(document.getElementById("c1").value);
                const C2S = parseFloat(document.getElementById("c2").value);
                if (!C1S || !C2S) throw "請輸入有效數值！";
                const Ct_series = 1 / (1 / C1S + 1 / C2S);
                result = `總電容 (串聯): ${Ct_series.toFixed(6)} F`;
                steps = `1/Cₜ = 1/C₁ + 1/C₂ → Cₜ ≈ ${Ct_series.toFixed(6)} F`;
                break;

            case "ac_rms":
                const Vpeak = parseFloat(document.getElementById("vpeak").value);
                if (!Vpeak) throw "請輸入有效數值！";
                const Vrms = Vpeak / Math.sqrt(2);
                result = `交流有效值: ${Vrms.toFixed(2)} V`;
                steps = `Vrms = V₍pk₎ / √2 = ${Vpeak}V / √2 = ${Vrms.toFixed(2)} V`;
                break;

            case "resistance_temperature":
                const R0 = parseFloat(document.getElementById("r0").value);
                const deltaT = parseFloat(document.getElementById("deltaT").value);
                const alpha = parseFloat(document.getElementById("alpha").value);
                if (!R0 || !deltaT || !alpha) throw "請輸入有效數值！";
                const Rt_temp = R0 * (1 + alpha * deltaT);
                result = `溫度變化後電阻: ${Rt_temp.toFixed(2)} Ω`;
                steps = `Rₜ = R₀(1 + αΔT) = ${R0}Ω × (1 + ${alpha} × ${deltaT}) = ${Rt_temp.toFixed(2)} Ω`;
                break;
            case "electric_energy":
                const C_energy = parseFloat(document.getElementById("C").value);
                const V_energy = parseFloat(document.getElementById("V").value);
                if (!C_energy || !V_energy) throw "請輸入有效數值！";
                const U = 0.5 * C_energy * Math.pow(V_energy, 2);
                result = `電場能量: ${U.toFixed(6)} J`;
                steps = `U = ½ C V² = ½ × ${C_energy} × ${V_energy}² = ${U.toFixed(6)} J`;
                break;
    
            case "current_density":
                const I_density = parseFloat(document.getElementById("I").value);
                const A_density = parseFloat(document.getElementById("A").value);
                if (!I_density || !A_density) throw "請輸入有效數值！";
                const J = I_density / A_density;
                result = `電流密度: ${J.toFixed(6)} A/m²`;
                steps = `J = I / A = ${I_density} / ${A_density} = ${J.toFixed(6)} A/m²`;
                break;
    
            case "voltage_divider":
                const Vin = parseFloat(document.getElementById("Vin").value);
                const R1_div = parseFloat(document.getElementById("R1").value);
                const R2_div = parseFloat(document.getElementById("R2").value);
                if (!Vin || !R1_div || !R2_div) throw "請輸入有效數值！";
                const Vout = Vin * (R2_div / (R1_div + R2_div));
                result = `分壓結果: ${Vout.toFixed(2)} V`;
                steps = `V₂ = Vin × (R₂ / (R₁ + R₂)) = ${Vin} × (${R2_div} / (${R1_div} + ${R2_div})) = ${Vout.toFixed(2)} V`;
                break;
            case "magnetic_field":
                const I_mag = parseFloat(document.getElementById("I").value);
                const r_mag = parseFloat(document.getElementById("r").value);
                const mu_0 = 4 * Math.PI * 1e-7;
                if (!I_mag || !r_mag) throw "請輸入有效數值！";
                const B = (mu_0 * I_mag) / (2 * Math.PI * r_mag);
                result = `磁場強度: ${B.toExponential(6)} T`;
                steps = `B = μ₀ × I / (2πr) = (4π × 10⁻⁷ × ${I_mag}) / (2π × ${r_mag}) = ${B.toExponential(6)} T`;
                break;
        
            case "faraday_law":
                const N = parseFloat(document.getElementById("N").value);
                const dPhiDt = parseFloat(document.getElementById("dPhiDt").value);
                if (!N || !dPhiDt) throw "請輸入有效數值！";
                const emf = -N * dPhiDt;
                result = `感應電動勢: ${emf.toFixed(2)} V`;
                steps = `ε = -N × dΦ/dt = -(${N} × ${dPhiDt}) = ${emf.toFixed(2)} V`;
                break;   
                case "three_phase_power":
                const vLine = parseFloat(document.getElementById("vLine").value);
                const iLine = parseFloat(document.getElementById("iLine").value);
                const cosTheta = parseFloat(document.getElementById("cosTheta").value);
                if (!vLine || !iLine || !cosTheta) throw "請輸入有效數值！";

                const s = Math.sqrt(3) * vLine * iLine;
                const p = s * cosTheta;
                const q = Math.sqrt(s * s - p * p);
                const pf = p / s;

                result = `視在功率: ${s.toFixed(2)} VA<br>有功功率: ${p.toFixed(2)} W<br>無功功率: ${q.toFixed(2)} VAR<br>功率因數: ${pf.toFixed(2)}`;
                steps = `P = √3 × V<sub>line</sub> × I<sub>line</sub> × cos(θ) = √3 × ${vLine} × ${iLine} × ${cosTheta} = ${p.toFixed(2)} W`;
                break;

            case "three_phase_voltage_star":
                const vLine_star = parseFloat(document.getElementById("vLine").value);
                if (!vLine_star) throw "請輸入有效數值！";
                const vPhase_star = vLine_star / Math.sqrt(3);
                result = `相電壓 (Y 接法): ${vPhase_star.toFixed(2)} V`;
                steps = `V<sub>ph</sub> = V<sub>line</sub> / √3 = ${vLine_star} / √3 = ${vPhase_star.toFixed(2)} V`;
                break;

            case "three_phase_voltage_delta":
                const vPhase_delta = parseFloat(document.getElementById("vPhase").value);
                if (!vPhase_delta) throw "請輸入有效數值！";
                const vLine_delta = vPhase_delta * Math.sqrt(3);
                result = `線電壓 (Δ 接法): ${vLine_delta.toFixed(2)} V`;
                steps = `V<sub>line</sub> = V<sub>ph</sub> × √3 = ${vPhase_delta} × √3 = ${vLine_delta.toFixed(2)} V`;
                break;
                case "three_phase_current_star":
                    const iLine_star = parseFloat(document.getElementById("iLine").value);
                    if (!iLine_star) throw "請輸入有效數值！";
                    const iPhase_star = iLine_star / Math.sqrt(3);
                    result = `相電流 (Y 接法): ${iPhase_star.toFixed(2)} A`;
                    steps = `I<sub>ph</sub> = I<sub>line</sub> / √3 = ${iLine_star} / √3 = ${iPhase_star.toFixed(2)} A`;
                    break;
    
                case "three_phase_current_delta":
                    const iPhase_delta = parseFloat(document.getElementById("iPhase").value);
                    if (!iPhase_delta) throw "請輸入有效數值！";
                    const iLine_delta = iPhase_delta * Math.sqrt(3);
                    result = `線電流 (Δ 接法): ${iLine_delta.toFixed(2)} A`;
                    steps = `I<sub>line</sub> = I<sub>ph</sub> × √3 = ${iPhase_delta} × √3 = ${iLine_delta.toFixed(2)} A`;
                    break;
        }
    } catch (error) {
        alert(error);
        return;
    }

    document.getElementById("result").innerHTML = result;
    document.getElementById("steps").innerHTML = steps;
}

// 頁面載入時初始化
window.onload = function () {
    updateFields();
};
