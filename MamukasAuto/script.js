/* =========================================================
   SECRET URL & PASSKEY DEVICE LOCK (CLIENT-SIDE)
========================================================= */
const SECRET_PASSKEY = "mySecretPass123";

(function checkDeviceAuth() {
    const urlParams = new URLSearchParams(window.location.search);
    const keyFromUrl = urlParams.get('deviceKey');

    if (keyFromUrl === SECRET_PASSKEY) {
        localStorage.setItem('auth_deviceKey', keyFromUrl);
        urlParams.delete('deviceKey');
        const cleanQuery = urlParams.toString() ? `?${urlParams.toString()}` : '';
        const cleanUrl = `${window.location.pathname}${cleanQuery}${window.location.hash}`;
        window.history.replaceState({}, document.title, cleanUrl);
    }

    const storedKey = localStorage.getItem('auth_deviceKey');
    if (storedKey === SECRET_PASSKEY) {
        return; 
    }

    const showUnlockScreen = () => {
        document.body.innerHTML = `
            <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;background:#0f172a;color:#f87171;font-family:system-ui,-apple-system,sans-serif;text-align:center;padding:24px;box-sizing:border-box;">
                <div style="background:rgba(239,68,68,0.1);padding:20px;border-radius:50%;margin-bottom:16px;border:1px solid rgba(239,68,68,0.2);">
                    <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
                <h1 style="font-size:22px;font-weight:700;margin:0 0 6px 0;color:#ffffff;">Device Authorization</h1>
                <p style="font-size:13px;line-height:1.5;color:#94a3b8;max-width:320px;margin:0 0 20px 0;">Enter your passkey to authorize this device / Home Screen app.</p>
                
                <form id="authForm" style="display:flex;flex-direction:column;gap:10px;width:100%;max-width:300px;">
                    <input type="password" id="passkeyInput" placeholder="Enter passkey..." autocomplete="off" style="width:100%;padding:12px 14px;background:#1e293b;border:1px solid #334155;border-radius:8px;color:#ffffff;font-size:15px;outline:none;box-sizing:border-box;text-align:center;">
                    <button type="submit" style="width:100%;padding:12px;background:#ef4444;border:none;border-radius:8px;color:#ffffff;font-size:15px;font-weight:600;cursor:pointer;">Unlock Device</button>
                </form>
                <span id="authError" style="font-size:12px;color:#f87171;margin-top:10px;display:none;">Invalid passkey. Please try again.</span>
            </div>
        `;
        document.body.style.margin = '0';
        document.body.style.background = '#0f172a';

        document.getElementById('authForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const inputVal = document.getElementById('passkeyInput').value.trim();
            if (inputVal === SECRET_PASSKEY) {
                localStorage.setItem('auth_deviceKey', inputVal);
                window.location.reload();
            } else {
                document.getElementById('authError').style.display = 'block';
            }
        });
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', showUnlockScreen);
    } else {
        showUnlockScreen();
    }

    throw new Error("Unauthorized access: Valid deviceKey required.");
})();

/* =========================================================
   REGISTER SERVICE WORKER (PWA & OFFLINE)
========================================================= */
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then(reg => console.log('PWA ServiceWorker active:', reg.scope))
            .catch(err => console.error('ServiceWorker error:', err));
    });
}

/* =========================================================
   ROUTES CONFIGURATION & DATA
========================================================= */
const ROUTES = {
    1: {
        id: 1,
        themeClass: 'route-theme-n1',
        color: '#ef4444',
        polylineCoords: [
            [41.9281442, 42.0306981], [41.9276334, 42.030993],
            [41.9272981, 42.030344], [41.9257775, 42.0266104], [41.9252586, 42.0253497],
            [41.923485, 42.020515], [41.9221095, 42.0165789], [41.9213883, 42.01234],
            [41.920925, 42.0096283], [41.9208641, 42.0086718], [41.9212083, 42.0074183],
            [41.9216545, 42.0061291], [41.9230633, 42.0057433], [41.9236102, 42.005657],
            [41.9237033, 42.00654], [41.9241451, 42.0094228], [41.9254583, 42.0140983],
            [41.9267567, 42.0179917], [41.927575, 42.0199083], [41.9286067, 42.0224267],
            [41.9290462, 42.0233808], [41.9298417, 42.022085], [41.9303073, 42.0209027],
            [41.9296883, 42.020385], [41.9290633, 42.01906], [41.9285673, 42.0178772],
            [41.9281667, 42.0180467], [41.9269868, 42.0184456], [41.92669, 42.0178083],
            [41.924685, 42.0116467], [41.92406, 42.009205], [41.92377, 42.006995],
            [41.9236821, 42.0056571], [41.9242867, 42.0055483], [41.9261817, 42.0054933],
            [41.9274897, 42.0054423], [41.9271317, 42.0045067], [41.9262963, 42.0015801],
            [41.9261646, 42.0006573], [41.926005, 42.0006198], [41.9259092, 42.0007914],
            [41.9262045, 42.0016712], [41.9264867, 42.002705], [41.9268283, 42.0038717],
            [41.9272821, 42.0053995], [41.92737, 42.0067667], [41.9274577, 42.0077598],
            [41.9277691, 42.0083499], [41.9262633, 42.0098633], [41.9252733, 42.010675],
            [41.9237017, 42.0114817], [41.9225246, 42.0120514], [41.922725, 42.012645],
            [41.9234183, 42.014145], [41.9240173, 42.0154523], [41.9231133, 42.01604],
            [41.9221175, 42.0164931], [41.9224117, 42.0176017], [41.9252283, 42.0254867],
            [41.9262085, 42.0277637], [41.9270227, 42.0295662], [41.9276733, 42.0309395],
            [41.9277783, 42.0309017]
        ],
        checkpoints: [
            [41.92827886006254, 42.03062373201157, "start"],
            [41.92796274580665, 42.03077430783884, "Sright"],
            [41.9273250, 42.0303133, "directlyunstillsigh"],
            [41.9234850, 42.0205150, "directlyunstillsigh"],
            [41.9213883, 42.0123400, "500rightonCircle"],
            [41.920925, 42.0096283, "300rightonCircle"],
            [41.9212083, 42.0074183, "rightonCircle"],
            [41.9230633, 42.0057433, "Sright"],
            [41.9237033, 42.0065400, "directlyunstillsigh"],
            [41.9254583, 42.0140983, "directlyunstillsigh"],
            [41.9267567, 42.0179917, "500left"],
            [41.927575, 42.0199083, "300left"],
            [41.9286067, 42.0224267, "Sleft"],
            [41.9298417, 42.0220850, "Sleft"],
            [41.9296883, 42.0203850, "300left"],
            [41.9290633, 42.0190600, "Sleft"],
            [41.9281667, 42.0180467, "Sright"],
            [41.9266900, 42.0178083, "directlyunstillsigh"],
            [41.9246850, 42.0116467, "500right"],
            [41.9240600, 42.0092050, "300right"],
            [41.9237700, 42.0069950, "Sright"],
            [41.9242867, 42.0055483, "300leftonCircle"],
            [41.9261817, 42.0054933, "leftonCircle"],
            [41.9271317, 42.0045067, "300lEFTlFETcIRCLE"],
            [41.9264867, 42.0027050, "SleftLfetCircle"],
            [41.92679456499402, 42.003894529049575, "dcircle"], //26
            [41.927408284123956, 42.00718472634494, "rightoncircle"],
            [41.9262633, 42.0098633, "directlyunstillsigh"],
            [41.9252733, 42.0106750, "300left"],
            [41.9237017, 42.0114817, "Sleft"],
            [41.9227250, 42.0126450, "300right"],
            [41.9234183, 42.0141450, "Sright"],
            [41.9231133, 42.0160400, "Sleft"],
            [41.9224117, 42.0176017, "directlyunstillsigh"],
            [41.9252283, 42.0254867, "500left"],
            [41.9261767, 42.0277833, "300left"],
            [41.9269683, 42.0296133, "Sleft"],
            [41.927839412154874, 42.03084430039432, "finishtan"],
            [41.92798184198065, 42.03078636479319, "stop"] //?
        ]
    },
    2: {
        id: 2,
        themeClass: 'route-theme-n2',
        color: '#22c55e',
        polylineCoords: [
            [41.9281442, 42.0306927], [41.9276573, 42.0308859],
            [41.9271544, 42.0298827], [41.9255659, 42.0260954], [41.9232083, 42.0197017],
            [41.9220456, 42.0164824], [41.9213383, 42.0120783], [41.920925, 42.0096083],
            [41.9209041, 42.0085323], [41.921155, 42.0075733], [41.9217742, 42.0062684],
            [41.9220696, 42.0059681], [41.9230433, 42.005795], [41.9236422, 42.0057213],
            [41.9240573, 42.0092082], [41.9258483, 42.0153283], [41.9265957, 42.0174801],
            [41.9270107, 42.018478], [41.9278033, 42.0182217], [41.9285673, 42.0178985],
            [41.9288133, 42.0184533], [41.929565, 42.0203017], [41.9303392, 42.0208382],
            [41.9296583, 42.0224533], [41.9290302, 42.0233597], [41.9286467, 42.0225417],
            [41.9262433, 42.0166917], [41.9256917, 42.014675], [41.9252783, 42.0134567],
            [41.9246, 42.01132], [41.9240333, 42.0090367], [41.9237938, 42.0075344],
            [41.9232817, 42.0075917], [41.922333, 42.0076633], [41.9223833, 42.007005],
            [41.9231283, 42.005285], [41.9231533, 42.0031083], [41.9237283, 42.0017433],
            [41.9252217, 42.000935], [41.9269017, 42.0041667], [41.9272422, 42.005201],
            [41.9274, 42.0063867], [41.9274258, 42.0071698], [41.9275735, 42.0071322],
            [41.9275233, 42.006535], [41.9274857, 42.0051902], [41.9271105, 42.0053136],
            [41.92603, 42.0054217], [41.9235733, 42.005585], [41.9228233, 42.0056867],
            [41.9221175, 42.0058715], [41.9216784, 42.0062041], [41.9212952, 42.0071589],
            [41.9208801, 42.0082318], [41.920815, 42.0090117], [41.92115, 42.0111583],
            [41.9214309, 42.0124913], [41.921825, 42.0124233], [41.9225246, 42.0120405],
            [41.9231517, 42.0135817], [41.92376, 42.0148833], [41.9248567, 42.0181967],
            [41.9251429, 42.019068], [41.923985, 42.0195217], [41.9231792, 42.0198297],
            [41.9234067, 42.0204283], [41.9253117, 42.0256283], [41.9261967, 42.02783],
            [41.9270517, 42.0297717], [41.9276373, 42.0310038], [41.9277817, 42.0309117]
        ],
        checkpoints: [
            [41.92827886006254, 42.03062373201157, "start"],
            [41.92796274580665, 42.03077430783884, "Sright"],
            [41.9271367, 42.0299017, "directlyunstillsigh"],
            [41.9232083, 42.0197017, "directlyunstillsigh"],
            [41.9213383, 42.0120783, "500rightonCircle"],
            [41.920925, 42.0096083, "300rightonCircle"],
            [41.9212083, 42.0074183, "rightonCircle"],
            [41.9230433, 42.005795, "Sright"],
            [41.92364228589608, 42.00602715652346, "directlyunstillsigh"],
            [41.9258483, 42.0153283, "300left"],
            [41.92656, 42.01749, "Sleft"],
            [41.9278033, 42.0182217, "Sright"],
            [41.9288133, 42.0184533, "300right"],
            [41.929565, 42.0203017, "Sright"],
            [41.9296583, 42.0224533, "Sright"],
            [41.9286467, 42.0225417, "directlyunstillsigh"],
            [41.9262433, 42.0166917, "directlyunstillsigh"],
            [41.9256917, 42.014675, "directlyunstillsigh"],
            [41.9252783, 42.0134567, "500left"],
            [41.9246, 42.01132, "300left"], //20
            [41.9240333, 42.0090367, "Sleft"],
            [41.9232817, 42.0075917, "Sright"],
            [41.9223833, 42.007005, "rightleft"],
            [41.9231283, 42.005285, "300right"],
            [41.9231533, 42.0031083, "Sright"],
            [41.9237283, 42.0017433, "rightonCircle"],// ? 26
            [41.9252217, 42.000935, "rightonCircle"],
            [41.9269017, 42.0041667, "cirlce"],

            [41.927303,42.006645, "leftleft"], //29
            [41.92755106715159, 42.00713127209854, ""], //29A corner U-turn
            [41.927480,42.006259, "leftonCircle"], //30

            [41.92603, 42.0054217, "directlyunstillsigh"],
            [41.9235783, 42.0055389, "cirlce"],
            [41.9228233, 42.0056867, "leftRightOnCircle"],
            [41.920815, 42.0090117, "300left"],
            [41.92115, 42.0111583, "Sleft"],
            [41.921825, 42.0124233, "Sright"],
            [41.9231517, 42.0135817, "500right"],
            [41.92376, 42.0148833, "300right"],
            [41.9248567, 42.0181967, "Sright"],
            [41.923985, 42.0195217, "Sleft"],
            [41.9234067, 42.0204283, "directlyunstillsigh"],
            [41.9253117, 42.0256283, "500left"],
            [41.9261967, 42.02783, "300left"],
            [41.9270517, 42.0297717, "Sleft"],
            [41.927839412154874, 42.03084430039432, "finishtan"],
            [41.92798184198065, 42.03078636479319, "stop"]
        ]
    },
    3: {
        id: 3,
        themeClass: 'route-theme-n3',
        color: '#a16207',
        polylineCoords: [
            [41.9281322, 42.0307088], [41.9276134, 42.0309878],
            [41.9266396, 42.0287776], [41.9259651, 42.027179], [41.9253544, 42.0255374],
            [41.9266217, 42.0248317], [41.9281333, 42.0240017], [41.9290382, 42.0234508],
            [41.92834, 42.0217], [41.92739, 42.0194483], [41.9269389, 42.0184672],
            [41.9259117, 42.0188467], [41.923965, 42.0195233], [41.923243, 42.0198191],
            [41.92306, 42.0192767], [41.9219967, 42.016025], [41.9216183, 42.01373],
            [41.921407, 42.0125233], [41.9220217, 42.0122817], [41.9234583, 42.011615],
            [41.9244564, 42.0110858], [41.924085, 42.0092433], [41.9237683, 42.006955],
            [41.9235943, 42.0056676], [41.92448, 42.0056133], [41.9263067, 42.0054917],
            [41.9272382, 42.0054691], [41.927326, 42.0061022], [41.9273979, 42.0066494],
            [41.9275216, 42.006644], [41.9274857, 42.005319], [41.9265333, 42.0028933],
            [41.9260609, 42.0013439], [41.9253617, 42.000985], [41.9243606, 42.0008289],
            [41.9235583, 42.001825], [41.9231233, 42.0019555], [41.9230902, 42.0025063],
            [41.9231472, 42.0034361], [41.92304, 42.0044967], [41.9230355, 42.005657],
            [41.9219099, 42.0059681], [41.9214788, 42.006483], [41.9208322, 42.0089615],
            [41.9210867, 42.0107617], [41.92149, 42.01311], [41.9218167, 42.0150083],
            [41.9221414, 42.0165038], [41.9231433, 42.0160433], [41.9240812, 42.0154416],
            [41.924925, 42.0151417], [41.9257336, 42.0148514], [41.9267317, 42.0178883],
            [41.927665, 42.0201717], [41.9286217, 42.0224867], [41.9289783, 42.0234508],
            [41.9277967, 42.0241517], [41.926005, 42.0251217], [41.9252906, 42.0255106],
            [41.92621, 42.0279083], [41.92701, 42.0297167], [41.9276833, 42.030965],
            [41.9278365, 42.0308752]
        ],
        checkpoints: [
            [41.92827886006254, 42.03062373201157, "start"],
            [41.92796274580665, 42.03077430783884, "Sright"],
            [41.9266233, 42.0287950, "300right"],
            [41.9259517, 42.0271867, "Sright"],
            [41.9266217, 42.0248317, "300left"],
            [41.9281333, 42.0240017, "Sleft"],
            [41.9283400, 42.0217000, "300left"],
            [41.9273900, 42.0194483, "Sleft"],
            [41.9259117, 42.0188467, "300right"],
            [41.9239650, 42.0195233, "Sright"],
            [41.9230600, 42.0192767, "directlyunstillsigh"],
            [41.9219967, 42.0160250, "300right"],
            [41.9216183, 42.0137300, "Sright"],
            [41.9220217, 42.0122817, "300left"],
            [41.9234583, 42.0116150, "Sleft"],
            [41.9240850, 42.0092433, "300right"],
            [41.9237683, 42.0069550, "Sright"],
            [41.9244800, 42.0056133, "300rightonCircle"],
            [41.9263067, 42.0054917, "rightonCircle"],

            [41.9272867, 42.0061000, "leftleft"], //20
            [41.92761477893684, 42.006522554006544, "dcircle"],
            
            [41.9265333, 42.0028933, "leftRightOnCircle"],
            [41.9253617, 42.0009850, "leftonCircle"],
            [41.9235583, 42.0018250, "Sleft"],
            [41.9230902, 42.0025063, "300right"],
            [41.9230400, 42.0044967, "Sright"],
            [41.9228733, 42.0056567, "leftRightOnCircle"],
            [41.9210867, 42.0107617, "500left"],
            [41.9214900, 42.0131100, "300left"],
            [41.9218167, 42.0150083, "Sleft"],
            [41.9231433, 42.0160433, "300right"],
            [41.9249250, 42.0151417, "Sright"],
            [41.9267317, 42.0178883, "500right"],
            [41.9276650, 42.0201717, "300right"],
            [41.9286217, 42.0224867, "Sright"],
            [41.9277967, 42.0241517, "300left"],
            [41.9260050, 42.0251217, "Sleft"],
            [41.9262100, 42.0279083, "300left"],
            [41.9270100, 42.0297167, "Sleft"],
            [41.927839412154874, 42.03084430039432, "finishtan"],
            [41.92798184198065, 42.03078636479319, "stop"]
        ]
    }
};

/* =========================================================
   AUDIO DICTIONARY
========================================================= */
const audioFiles = {
    "start": "audio/start.mp3",
    "start3": "audio/start3.mp3",
    "finishtan": "audio/finishtan.mp3",
    "stop": "audio/stop.mp3",
    "500left": "audio/500left.mp3",
    "500right": "audio/500right.mp3",
    "300left": "audio/300left.mp3",
    "300right": "audio/300right.mp3",
    "100left": "audio/100left.mp3",
    "100right": "audio/100right.mp3",
    "left": "audio/left.mp3",
    "Sleft": "audio/Sleft.mp3",
    "right": "audio/right.mp3",
    "Sright": "audio/Sright.mp3",
    "directly": "audio/directly.mp3",
    "directlyunstillsigh": "audio/directlyunstillsigh.mp3",
    "leftonCircle": "audio/leftonCircle.mp3",
    "rightonCircle": "audio/rightonCircle.mp3",
    "300leftonCircle": "audio/300leftonCircle.mp3",
    "300rightonCircle": "audio/300rightonCircle.mp3",
    "500leftonCircle": "audio/500leftonCircle.mp3",
    "500rightonCircle": "audio/500rightonCircle.mp3",
    "rightleft": "audio/rightleft.mp3",
    "leftleft": "audio/leftleft.mp3",
    "rightLeftOnCircle": "audio/rightLeftOnCircle.mp3",
    "leftRightOnCircle": "audio/leftRightOnCircle.mp3",
    "SleftLfetCircle": "audio/SleftLfetCircle.mp3",
    "300lEFTlFETcIRCLE": "audio/300lEFTlFETcIRCLE.mp3",
    "dcircle": "audio/dcircle.mp3",
    "cirlce": "audio/cirlce.mp3"
};

/* =========================================================
   DEBUG HUD (local only — no database logging)
   ========================================================= */
// NOTE: Supabase telemetry logging removed — debug events render
// to the on-screen HUD only and are never saved to any database.

// One id per page-load session (persisted across reloads within same tab session)
const DEBUG_SESSION_ID = (() => {
    let id = sessionStorage.getItem('debug_session_id');
    if (!id) {
        id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + '-' + Math.random());
        sessionStorage.setItem('debug_session_id', id);
    }
    return id;
})();

// Live GPS context, refreshed on every position fix so checkpoint HUD shows live values
let debugGpsContext = { lat: null, lng: null, accuracy: null, speedKmh: null, heading: null };

// NOTE: Database log queue / flush removed — no logs are saved anywhere.


// Record a checkpoint-trigger debug event: update HUD only (no database logging)
function recordDebugEvent(info) {
    const outOfOrder = typeof info.firedIndex === 'number'
        && typeof info.expectedIndex === 'number'
        && info.firedIndex < info.expectedIndex;

    const event = {
        ts: Date.now(),
        routeId: activeRouteId,
        firedIndex: info.firedIndex,
        expectedIndex: info.expectedIndex,
        firedName: info.firedName || null,
        lat: debugGpsContext.lat,
        lng: debugGpsContext.lng,
        accuracy: debugGpsContext.accuracy,
        speed: debugGpsContext.speedKmh,
        heading: debugGpsContext.heading,
        nearestDist: info.nearestDist != null ? Math.round(info.nearestDist * 10) / 10 : null,
        nextDist: info.nextDist != null ? Math.round(info.nextDist * 10) / 10 : null,
        nearestIndex: (typeof info.nearestIndex === 'number') ? info.nearestIndex : null,
        isSimulating: !!isSimulating,
        outOfOrder
    };

    if (isDebugMode) {
        renderDebugHud(event);
    }
}

function renderDebugHud(event) {
    const hud = document.getElementById('debugHud');
    if (!hud) return;

    const setText = (id, value, outOfOrder) => {
        const el = document.getElementById(id);
        if (!el) return;
        el.textContent = value;
        el.classList.toggle('out-of-order', !!outOfOrder);
    };

    // event indices are 0-based internally; HUD shows 1-based pin numbers
    // to match the map markers (e.g. internal 29 => pin #30).
    const fmtPin = (idx) => (typeof idx === 'number' && idx >= 0) ? `#${idx + 1}` : '—';
    const nearestLabel = (typeof event.nearestIndex === 'number' && event.nearestIndex >= 0 && event.nearestDist != null)
        ? `#${event.nearestIndex + 1} ${event.nearestDist}m`
        : (event.nearestDist != null ? `${event.nearestDist} m` : '—');

    setText('dbgRoute', `R${event.routeId}`);
    setText('dbgExpected', fmtPin(event.expectedIndex));
    setText('dbgFired', fmtPin(event.firedIndex), event.outOfOrder);
    setText('dbgNearest', nearestLabel);
    setText('dbgNextDist', event.nextDist != null ? `${event.nextDist} m` : '—');
    setText('dbgAccuracy', event.accuracy != null ? `${Math.round(event.accuracy)} m` : '—');
    setText('dbgSpeed', event.speed != null ? `${event.speed} km/h` : '—');
    setText('dbgHeading', event.heading != null ? `${Math.round(event.heading)}°` : '—');
    setText('dbgSim', event.isSimulating ? 'YES' : 'NO');

    const logEl = document.getElementById('debugHudLog');
    if (logEl) {
        const entry = document.createElement('div');
        entry.className = 'debug-log-entry' + (event.outOfOrder ? ' out-of-order' : '');
        const time = new Date(event.ts).toLocaleTimeString();
        entry.innerHTML = `<strong>${time}</strong> ${fmtPin(event.firedIndex)} "${event.firedName || '?'}" (exp ${fmtPin(event.expectedIndex)}) nearest=${nearestLabel} toNext=${event.nextDist != null ? event.nextDist + 'm' : '?'}${event.outOfOrder ? ' ⚠ EARLY' : ''}`;
        logEl.prepend(entry);
        while (logEl.children.length > 40) {
            logEl.removeChild(logEl.lastChild);
        }
    }
}

function setDebugHudVisibility(visible) {
    const hud = document.getElementById('debugHud');
    if (hud) hud.style.display = visible ? 'flex' : 'none';
}



/* =========================================================
   GLOBAL STATE & MAP SETUP
========================================================= */
let activeRouteId = 1;
let currentCheckpointIndex = 0;
let playedPoints = new Set();
let userLocationMarker = null;
let currentMarkerPos = null;
let markerAnimationId = null;

// Settings Flags
let isNavMode = localStorage.getItem('setting_navMode') !== null
    ? localStorage.getItem('setting_navMode') === 'true'
    : true;

let isAutoRotate = localStorage.getItem('setting_autoRotate') === 'true';
let isShowCheckpoints = localStorage.getItem('setting_showCheckpoints') === 'true'; // Default OFF
let currentTheme = localStorage.getItem('setting_theme') || 'theme-sunset';
let isSimVoiceEnabled = true;

// Debug Mode (HUD only) — Default OFF
let isDebugMode = localStorage.getItem('setting_debugMode') === 'true';

// NOTE: Dynamic Route Recovery removed — it conflicted with tight
// loops (Route 2 CP29/CP30 are ~29m apart) and hijacked sequential
// playback. Use Settings > Jump to Nearest Checkpoint for testing.

// Initialize Leaflet Map
const map = L.map('map', {
    center: [41.9236, 42.0143],
    zoom: 17,
    zoomControl: false,
    attributionControl: false
});

// Tile Layer
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 18
}).addTo(map);

const routePolylineLayer = L.layerGroup().addTo(map);
const checkpointMarkersLayer = L.layerGroup().addTo(map);
const checkpointPinsLayer = L.layerGroup().addTo(map); // numbered checkpoint pins only

const userIcon = L.icon({
    iconUrl: 'icons/location.png',
    iconSize: [38, 38],
    iconAnchor: [19, 38]
});

/* =========================================================
   MATH & BEARING HELPERS
========================================================= */
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) *
        Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function calculateBearing(lat1, lon1, lat2, lon2) {
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;
    const y = Math.sin(Δλ) * Math.cos(φ2);
    const x = Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
    return ((Math.atan2(y, x) * 180 / Math.PI) + 360) % 360;
}

function getDynamicZoom(speedKmh) {
    if (speedKmh <= 15) return 18;
    if (speedKmh <= 35) return 17;
    if (speedKmh <= 60) return 16;
    return 15;
}

function playAudio(audioKey) {
    if (isSimulating && !isSimVoiceEnabled) return;

    if (audioFiles[audioKey]) {
        const audio = new Audio(audioFiles[audioKey]);
        audio.volume = 0.6;
        audio.play().catch(err => console.warn("Audio playback issue:", err));
    }
}

/* =========================================================
   OFFLINE DISCONNECTION HANDLER
========================================================= */
function disableNavModeOffline() {
    if (!navigator.onLine && isNavMode) {
        isNavMode = false;
        localStorage.setItem('setting_navMode', 'false');

        const navModeToggle = document.getElementById('navModeToggle');
        if (navModeToggle) {
            navModeToggle.checked = false;
        }

        syncAutoRotateVisibility();
        updateMapHeading(0);

        if (ROUTES[activeRouteId]) {
            const currentPolyline = ROUTES[activeRouteId].polylineCoords;
            map.fitBounds(L.polyline(currentPolyline).getBounds(), {
                padding: [80, 80],
                maxZoom: 16,
                animate: true
            });
        }
    }
}

/* =========================================================
   MAP ROTATION & COMPASS
========================================================= */
function updateMapHeading(heading) {
    const compassIcon = document.getElementById('compassIcon');
    if (compassIcon) {
        compassIcon.style.transform = `rotate(${heading}deg)`;
    }

    const rotator = document.getElementById('mapRotator');
    if (!rotator) return;

    if (isAutoRotate && isNavMode) {
        rotator.style.transform = `rotate(${-heading}deg)`;
    } else {
        rotator.style.transform = 'none';
    }
}

/* =========================================================
   SMOOTH MARKER TWEEN (NO FLICKER)
========================================================= */
function smoothMoveMarker(targetLat, targetLng, durationMs) {
    if (!userLocationMarker) {
        userLocationMarker = L.marker([targetLat, targetLng], { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
        currentMarkerPos = { lat: targetLat, lng: targetLng };
        return;
    }

    if (!currentMarkerPos) {
        currentMarkerPos = { lat: targetLat, lng: targetLng };
        userLocationMarker.setLatLng([targetLat, targetLng]);
        return;
    }

    const startLat = currentMarkerPos.lat;
    const startLng = currentMarkerPos.lng;
    const startTime = performance.now();

    if (markerAnimationId) {
        cancelAnimationFrame(markerAnimationId);
    }

    function step(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / durationMs, 1);

        const curLat = startLat + (targetLat - startLat) * progress;
        const curLng = startLng + (targetLng - startLng) * progress;

        currentMarkerPos = { lat: curLat, lng: curLng };
        userLocationMarker.setLatLng([curLat, curLng]);

        if (progress < 1) {
            markerAnimationId = requestAnimationFrame(step);
        }
    }

    markerAnimationId = requestAnimationFrame(step);
}

/* =========================================================
   CHECKPOINT TRIGGER
========================================================= */
const TRIGGER_RADIUS = 25; 
const LOOK_AHEAD_COUNT = 0;

function checkCheckpoints(lat, lng) {
    const currentRoute = ROUTES[activeRouteId];
    if (!currentRoute || currentCheckpointIndex >= currentRoute.checkpoints.length) return;

    const checkpoints = currentRoute.checkpoints;

    // Compute overall nearest checkpoint (true index + dist) for debug HUD.
    // NOTE: checkpoint positions are NOT changed here — read-only scan.
    let dbgNearestDist = Infinity;
    let dbgNearestIndex = -1;
    for (let i = 0; i < checkpoints.length; i++) {
        const d = calculateDistance(lat, lng, checkpoints[i][0], checkpoints[i][1]);
        if (d < dbgNearestDist) {
            dbgNearestDist = d;
            dbgNearestIndex = i;
        }
    }

    // Distance to the CURRENT expected checkpoint (what debug "To Next" shows).
    const expectedCp = checkpoints[currentCheckpointIndex];
    const distToNext = expectedCp ? calculateDistance(lat, lng, expectedCp[0], expectedCp[1]) : null;

    // Strict sequential: only expected checkpoint can fire. Fixes R2 CP29/CP30 U-turn overlap (28.7m apart, radii overlap).
    // If a checkpoint is missed, use Settings > Jump to Nearest Checkpoint (manual recovery).
    const maxIndex = Math.min(currentCheckpointIndex + LOOK_AHEAD_COUNT, checkpoints.length - 1);

    for (let i = currentCheckpointIndex; i <= maxIndex; i++) {
        if (playedPoints.has(i)) continue;

        const cp = checkpoints[i];
        const dist = calculateDistance(lat, lng, cp[0], cp[1]);

        if (dist < TRIGGER_RADIUS) {
            playAudio(cp[2]);

            // Recompute "to next" AFTER advancing, so HUD shows distance to the
            // new expected checkpoint rather than the one that just fired.
            const newExpectedCp = checkpoints[i + 1];
            const newNextDist = newExpectedCp ? calculateDistance(lat, lng, newExpectedCp[0], newExpectedCp[1]) : null;

            recordDebugEvent({
                firedIndex: i,
                expectedIndex: currentCheckpointIndex,
                firedName: cp[2],
                nearestDist: dbgNearestDist,
                nearestIndex: dbgNearestIndex,
                nextDist: newNextDist
            });

            for (let j = currentCheckpointIndex; j <= i; j++) {
                playedPoints.add(j);
            }

            currentCheckpointIndex = i + 1;
            break;
        }
    }

    // Live HUD refresh even when nothing fired, so "To Next" counts down
    // correctly while approaching CP29/CP30. No audio, no state change.
    if (isDebugMode) {
        refreshLiveDebugHud(distToNext, dbgNearestDist, dbgNearestIndex);
    }
}

// Live per-fix HUD refresh (no checkpoint fired): shows correct
// current checkpoint (1-based) + live distance to next + true nearest.
function refreshLiveDebugHud(distToNext, dbgNearestDist, dbgNearestIndex) {
    const hud = document.getElementById('debugHud');
    if (!hud || hud.style.display === 'none') return;
    const setText = (id, value) => {
        const el = document.getElementById(id);
        if (el) el.textContent = value;
    };
    const fmtPin = (idx) => (typeof idx === 'number' && idx >= 0) ? `#${idx + 1}` : '—';
    const nearestLabel = (typeof dbgNearestIndex === 'number' && dbgNearestIndex >= 0)
        ? `#${dbgNearestIndex + 1} ${Math.round(dbgNearestDist)}m` : '—';
    setText('dbgRoute', `R${activeRouteId}`);
    setText('dbgExpected', fmtPin(currentCheckpointIndex));
    setText('dbgFired', fmtPin(currentCheckpointIndex - 1));
    setText('dbgNearest', nearestLabel);
    setText('dbgNextDist', distToNext != null ? `${Math.round(distToNext)} m` : '—');
}

// TEST HELPER: find nearest checkpoint to current GPS and continue exam
// from there. Does NOT modify checkpoint coordinates.
function jumpToNearestCheckpoint() {
    const route = ROUTES[activeRouteId];
    if (!route) return;
    let ref = null;
    if (typeof lastRealGps !== 'undefined' && lastRealGps) ref = { lat: lastRealGps.lat, lng: lastRealGps.lng };
    else if (typeof currentMarkerPos !== 'undefined' && currentMarkerPos) ref = { lat: currentMarkerPos.lat, lng: currentMarkerPos.lng };
    else if (typeof map !== 'undefined' && map && map.getCenter) {
        const c = map.getCenter();
        ref = { lat: c.lat, lng: c.lng };
    }
    if (!ref) {
        alert('No GPS position yet — enable location or start Demo, then retry.');
        return;
    }
    let nearestIdx = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < route.checkpoints.length; i++) {
        const d = calculateDistance(ref.lat, ref.lng, route.checkpoints[i][0], route.checkpoints[i][1]);
        if (d < nearestDist) {
            nearestDist = d;
            nearestIdx = i;
        }
    }
    playedPoints = new Set();
    for (let j = 0; j < nearestIdx; j++) playedPoints.add(j);
    currentCheckpointIndex = nearestIdx;
    const cp = route.checkpoints[nearestIdx];
    const label = `#${nearestIdx + 1}`;
    addLog(`Test jump to nearest ${label} (${Math.round(nearestDist)}m, "${cp[2]}"). Continuing exam from ${label}.`);
    try { unlockAudio(); } catch (e) {}
    try { playAudio(cp[2]); } catch (e) {}
    updateCheckpointMarkers();
    if (isDebugMode) {
        renderDebugHud({
            ts: Date.now(),
            routeId: activeRouteId,
            firedIndex: nearestIdx - 1,
            expectedIndex: nearestIdx,
            firedName: cp[2],
            nearestDist: nearestDist,
            nearestIndex: nearestIdx,
            nextDist: nearestDist
        });
    }
    const drawer = document.getElementById('settingsDrawer');
    if (drawer) drawer.classList.remove('active');
    const overlay = document.getElementById('drawerOverlay');
    if (overlay) overlay.classList.remove('active');
}

/* =========================================================
   CHECKPOINT INFO POPUP (TAP TO VIEW VOICE TEXT & COORDS)
========================================================= */
function buildCheckpointPopupHtml(checkpoint, index) {
    const voiceText = checkpoint[2] || '—';
    const latText = checkpoint[0];
    const lngText = checkpoint[1];

    return `
        <div class="cp-popup">
            <div class="cp-popup-title"><i class="fas fa-map-pin"></i> Checkpoint #${index + 1}</div>
            <div class="cp-popup-row">
                <span class="cp-popup-label"><i class="fas fa-volume-high"></i> Voice Text</span>
                <span class="cp-popup-value cp-popup-voice">${voiceText}</span>
            </div>
            <div class="cp-popup-row">
                <span class="cp-popup-label"><i class="fas fa-crosshairs"></i> Coordinates</span>
                <span class="cp-popup-value">${latText}, ${lngText}</span>
            </div>
        </div>
    `;
}

/* =========================================================
   CHECKPOINT PIN MARKERS (NUMBERED, TAP FOR INFO)
========================================================= */
function addCheckpointMarkers(route) {
    if (!route || !route.checkpoints) return;

    route.checkpoints.forEach((checkpoint, index) => {
        const checkpointIcon = L.divIcon({
            className: 'checkpoint-pin-wrapper',
            html: `<div class="checkpoint-pin"><span>${index + 1}</span></div>`,
            iconSize: [26, 26],
            iconAnchor: [13, 26]
        });

        L.marker([checkpoint[0], checkpoint[1]], {
            icon: checkpointIcon,
            interactive: true
        }).addTo(checkpointPinsLayer).bindPopup(buildCheckpointPopupHtml(checkpoint, index), {
            className: 'checkpoint-popup',
            closeButton: true,
            autoPan: true,
            autoPanPadding: [60, 60]
        });
    });
}

/* =========================================================
   DYNAMIC ROUTE SWITCHER (SOLID LINE STYLE)
========================================================= */
function loadRoute(routeId) {
    const route = ROUTES[routeId];
    if (!route) return;

    activeRouteId = routeId;
    currentCheckpointIndex = 0;
    playedPoints.clear();

    if (isSimulating) {
        stopSimulation();
    }

    document.querySelectorAll('.route-btn').forEach(btn => {
        btn.classList.toggle('active', parseInt(btn.dataset.route) === routeId);
    });

    routePolylineLayer.clearLayers();
    checkpointMarkersLayer.clearLayers();
    checkpointPinsLayer.clearLayers();

    // Solid polyline with no dashArray
    const polyline = L.polyline(route.polylineCoords, {
        color: route.color,
        weight: 6,
        opacity: 0.9,
        lineCap: 'round',
        lineJoin: 'round'
    }).addTo(routePolylineLayer);

    route.polylineCoords.forEach(coord => {
        L.circleMarker(coord, {
            color: '#ffffff',
            weight: 1,
            opacity: 0.95,
            fillColor: '#1f3a5f',
            fillOpacity: 0.75,
            radius: 3,
            interactive: false
        }).addTo(checkpointMarkersLayer);
    });

    if (isShowCheckpoints) {
        addCheckpointMarkers(route);
    }

    if (!isNavMode) {
        map.fitBounds(polyline.getBounds(), { padding: [80, 80], maxZoom: 16 });
    } else if (lastRealGps) {
        map.panTo([lastRealGps.lat, lastRealGps.lng], { animate: true, duration: 0.8 });
    }
}

/* =========================================================
   REAL-TIME GPS HARDWARE WATCHER (FLICKER-FREE)
========================================================= */
let geoWatchId = null;
let lastGpsTimestamp = null;
let lastGpsPos = null;
let lastRealGps = null;

function handleGpsSuccess(position) {
    if (isSimulating) return;

    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    const now = position.timestamp || Date.now();

    // Dynamic Interval Duration (Typically ~1000ms)
    let updateDurationMs = 1000;
    if (lastGpsTimestamp) {
        const measuredDt = now - lastGpsTimestamp;
        if (measuredDt > 200 && measuredDt < 3000) {
            updateDurationMs = measuredDt;
        }
    }

    // Calculate Speed (Fallback for iOS/WebKit)
    let speedMps = position.coords.speed;
    if (speedMps === null || isNaN(speedMps) || speedMps < 0) {
        if (lastGpsPos && lastGpsTimestamp) {
            const dtSec = (now - lastGpsTimestamp) / 1000;
            if (dtSec > 0.2 && dtSec < 10) {
                const distMoved = calculateDistance(lastGpsPos.lat, lastGpsPos.lng, lat, lng);
                speedMps = distMoved / dtSec;
            } else {
                speedMps = 0;
            }
        } else {
            speedMps = 0;
        }
    }
    const speedKmh = Math.max(0, Math.round((speedMps || 0) * 3.6));

    // Calculate Heading
    let heading = position.coords.heading;
    if (heading === null || isNaN(heading) || heading < 0) {
        if (lastGpsPos) {
            const distMoved = calculateDistance(lastGpsPos.lat, lastGpsPos.lng, lat, lng);
            if (distMoved >= 2.0) {
                heading = calculateBearing(lastGpsPos.lat, lastGpsPos.lng, lat, lng);
            } else {
                heading = lastRealGps ? lastRealGps.heading : 0;
            }
        } else {
            heading = 0;
        }
    }

    lastGpsPos = { lat, lng };
    lastGpsTimestamp = now;
    lastRealGps = { lat, lng, speed: speedMps, heading };

    // Refresh debug HUD context, then check checkpoints with full GPS info available
    debugGpsContext = {
        lat,
        lng,
        accuracy: (position.coords.accuracy != null) ? position.coords.accuracy : null,
        speedKmh,
        heading
    };
    checkCheckpoints(lat, lng);

    // Update Speedometer UI
    const speedValueEl = document.getElementById('speedValue');
    if (speedValueEl) speedValueEl.textContent = speedKmh;

    // Smoothly Glide Marker
    smoothMoveMarker(lat, lng, updateDurationMs);

    // Update Heading / Compass
    updateMapHeading(heading);

    // Smoothly Pan Map Camera (Using GPU CSS transform)
    if (isNavMode) {
        const targetZoom = getDynamicZoom(speedKmh);
        if (Math.abs(map.getZoom() - targetZoom) >= 1) {
            map.setZoom(targetZoom);
        }
        map.panTo([lat, lng], {
            animate: true,
            duration: updateDurationMs / 1000,
            easeLinearity: 0.2
        });
    }
}

function handleGpsError(err) {
    console.warn(`GPS Error (${err.code}): ${err.message}`);
    if (err.code === 1) {
        alert("Location access denied. Please enable location permissions in your browser or device settings.");
    }
}

function startGeolocationWatch() {
    if (!('geolocation' in navigator)) {
        console.error("Geolocation is not supported by this browser.");
        return;
    }

    if (geoWatchId !== null) {
        navigator.geolocation.clearWatch(geoWatchId);
        geoWatchId = null;
    }

    geoWatchId = navigator.geolocation.watchPosition(
        handleGpsSuccess,
        handleGpsError,
        {
            enableHighAccuracy: true,
            maximumAge: 0,
            timeout: 27000
        }
    );
}

/* =========================================================
   60 FPS ROUTE SIMULATION ENGINE
========================================================= */
let isSimulating = false;
let simAnimationId = null;
let simDistanceTraveled = 0;
let simSpeedMultiplier = 1;
let lastSimTimestamp = performance.now();
let routePathSegments = [];
let totalRouteLength = 0;

function buildRouteMetrics(coords) {
    routePathSegments = [];
    totalRouteLength = 0;

    for (let i = 0; i < coords.length - 1; i++) {
        const p1 = coords[i];
        const p2 = coords[i + 1];
        const len = calculateDistance(p1[0], p1[1], p2[0], p2[1]);
        const bearing = calculateBearing(p1[0], p1[1], p2[0], p2[1]);

        routePathSegments.push({
            p1,
            p2,
            length: len,
            bearing,
            startDist: totalRouteLength,
            endDist: totalRouteLength + len
        });
        totalRouteLength += len;
    }
}

function getPositionAtDistance(dist) {
    if (!routePathSegments.length) return null;
    if (dist <= 0) return { lat: routePathSegments[0].p1[0], lng: routePathSegments[0].p1[1], bearing: routePathSegments[0].bearing };
    if (dist >= totalRouteLength) {
        const last = routePathSegments[routePathSegments.length - 1];
        return { lat: last.p2[0], lng: last.p2[1], bearing: last.bearing };
    }

    for (let i = 0; i < routePathSegments.length; i++) {
        const seg = routePathSegments[i];
        if (dist >= seg.startDist && dist <= seg.endDist) {
            const segFraction = (dist - seg.startDist) / (seg.length || 1);
            const lat = seg.p1[0] + (seg.p2[0] - seg.p1[0]) * segFraction;
            const lng = seg.p1[1] + (seg.p2[1] - seg.p1[1]) * segFraction;
            return { lat, lng, bearing: seg.bearing };
        }
    }
    return null;
}

function startSimulation() {
    const route = ROUTES[activeRouteId];
    if (!route) return;

    buildRouteMetrics(route.polylineCoords);
    isSimulating = true;

    const demoPlayBtn = document.getElementById('demoPlayBtn');
    if (demoPlayBtn) demoPlayBtn.innerHTML = '<i class="fas fa-pause"></i>';

    cancelAnimationFrame(simAnimationId);
    lastSimTimestamp = performance.now();

    const baseSpeedMps = 11.1; // ~40 km/h — realistic urban driving speed

    // Evaluate checkpoints at GPS-like cadence (1 Hz) instead of every frame,
    // so simulation behaves like real driving.
    const CHECK_INTERVAL_MS = 1000;
    let lastCheckTs = 0;

    function animationLoop(timestamp) {
        if (!isSimulating) return;

        const dt = Math.min((timestamp - lastSimTimestamp) / 1000, 0.1);
        lastSimTimestamp = timestamp;

        const effectiveSpeedMps = baseSpeedMps * simSpeedMultiplier;
        simDistanceTraveled += effectiveSpeedMps * dt;

        if (simDistanceTraveled >= totalRouteLength) {
            restartSimulation();
            return;
        }

        const currentPos = getPositionAtDistance(simDistanceTraveled);
        if (currentPos) {
            if (timestamp - lastCheckTs >= CHECK_INTERVAL_MS) {
                lastCheckTs = timestamp;
                checkCheckpoints(currentPos.lat, currentPos.lng);
            }

            if (userLocationMarker) {
                userLocationMarker.setLatLng([currentPos.lat, currentPos.lng]);
            } else {
                userLocationMarker = L.marker([currentPos.lat, currentPos.lng], { icon: userIcon }).addTo(map);
            }
            currentMarkerPos = { lat: currentPos.lat, lng: currentPos.lng };

            updateMapHeading(currentPos.bearing);

            const speedKmh = Math.round(effectiveSpeedMps * 3.6);
            const speedValueEl = document.getElementById('speedValue');
            if (speedValueEl) speedValueEl.textContent = speedKmh;

            // Feed sim position/speed/heading into the debug context so
            // HUD shows realistic values while simulating
            // (accuracy stays null — there is no GPS error in simulation).
            debugGpsContext = {
                lat: currentPos.lat,
                lng: currentPos.lng,
                accuracy: null,
                speedKmh: speedKmh,
                heading: currentPos.bearing
            };

            if (isNavMode) {
                map.setView([currentPos.lat, currentPos.lng], getDynamicZoom(speedKmh), { animate: false });
            }
        }

        simAnimationId = requestAnimationFrame(animationLoop);
    }

    simAnimationId = requestAnimationFrame(animationLoop);
}

function pauseSimulation() {
    cancelAnimationFrame(simAnimationId);
    simAnimationId = null;
    const demoPlayBtn = document.getElementById('demoPlayBtn');
    if (demoPlayBtn) demoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';
}

function restartSimulation() {
    cancelAnimationFrame(simAnimationId);
    simAnimationId = null;
    simDistanceTraveled = 0;
    currentCheckpointIndex = 0;
    playedPoints.clear();
    startSimulation();
}

function stopSimulation() {
    cancelAnimationFrame(simAnimationId);
    simAnimationId = null;
    isSimulating = false;
    simDistanceTraveled = 0;
    currentCheckpointIndex = 0;
    playedPoints.clear();

    const demoPlayBtn = document.getElementById('demoPlayBtn');
    if (demoPlayBtn) demoPlayBtn.innerHTML = '<i class="fas fa-play"></i>';

    const speedValueEl = document.getElementById('speedValue');
    if (speedValueEl) speedValueEl.textContent = 0;

    if (lastRealGps) {
        smoothMoveMarker(lastRealGps.lat, lastRealGps.lng, 600);
        map.panTo([lastRealGps.lat, lastRealGps.lng], { animate: true });
    }
}

/* =========================================================
   DEV TEST HELPER: start Demo from checkpoint N (1-based)
   Map pins ARE checkpoints[] order, so N is the pin number
   you see on map. e.g. startSimulationFromCheckpoint(27)
   puts Demo ~120m before pin #27 so #27->#28->#29->#30
   all fire in order. Console or button use.
========================================================= */
function startSimulationFromCheckpoint(n1, leadMeters) {
    // n1 = CHECKPOINT pin number as shown on map (1-based checkpoints[] index+1).
    const route = ROUTES[activeRouteId];
    if (!route) return;
    buildRouteMetrics(route.polylineCoords);
    const total = route.polylineCoords.length;
    const cpIdx = Math.max(0, Math.min((n1 || 27) - 1, route.checkpoints.length - 1));
    const lead = (leadMeters == null) ? 120 : leadMeters;
    const cum = [0];
    for (let i = 1; i < total; i++) {
        const a = route.polylineCoords[i - 1];
        const b = route.polylineCoords[i];
        cum[i] = cum[i - 1] + calculateDistance(a[0], a[1], b[0], b[1]);
    }
    // route-distance of each audio checkpoint = distance of nearest polyline point
    const cpRouteDist = route.checkpoints.map((cp) => {
        let bd = Infinity, bi = 0;
        for (let i = 0; i < total; i++) {
            const p = route.polylineCoords[i];
            const d = calculateDistance(p[0], p[1], cp[0], cp[1]);
            if (d < bd) { bd = d; bi = i; }
        }
        return cum[bi];
    });
    const targetCum = cpRouteDist[cpIdx];
    playedPoints = new Set();
    for (let j = 0; j < cpIdx; j++) playedPoints.add(j);
    currentCheckpointIndex = cpIdx;
    simDistanceTraveled = Math.max(0, targetCum - lead);
    try { addLog('TEST Demo from pin #' + (cpIdx + 1) + ' (' + Math.round(targetCum) + 'm).'); } catch (e) {}
    if (!isSimulating) { startSimulation(); } else { lastSimTimestamp = performance.now(); }
    const cp = route.checkpoints[cpIdx];
    try { map.panTo([cp[0], cp[1]], { animate: true }); } catch (e) {}
}
window.startSimulationFromCheckpoint = startSimulationFromCheckpoint;

/* =========================================================
   THEMES & CONTROLS BINDING
========================================================= */
function applyTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem('setting_theme', themeName);
    currentTheme = themeName;

    document.querySelectorAll('.theme-chip').forEach(chip => {
        chip.classList.toggle('active', chip.dataset.theme === themeName);
    });
}

function syncAutoRotateVisibility() {
    const autoRotateCard = document.getElementById('autoRotateCard');
    if (autoRotateCard) {
        autoRotateCard.style.display = isNavMode ? 'block' : 'none';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    applyTheme(currentTheme);
    syncAutoRotateVisibility();
    loadRoute(1);
    startGeolocationWatch();

    // Check offline status on app launch
    if (!navigator.onLine) {
        disableNavModeOffline();
    }

    // Dynamic offline event listener
    window.addEventListener('offline', disableNavModeOffline);

    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && !isSimulating) {
            startGeolocationWatch();
        }
    });

    setTimeout(() => { map.invalidateSize(); }, 200);

    // Route Switcher
    document.querySelectorAll('.route-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            loadRoute(parseInt(btn.dataset.route));
        });
    });

    // Settings Drawer
    const settingsDrawer = document.getElementById('settingsDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const openSettingsBtn = document.getElementById('openSettingsBtn');
    const closeSettingsBtn = document.getElementById('closeSettingsBtn');

    const openDrawer = () => {
        settingsDrawer.classList.add('active');
        drawerOverlay.classList.add('active');
    };

    const closeDrawer = () => {
        settingsDrawer.classList.remove('active');
        drawerOverlay.classList.remove('active');
    };

    openSettingsBtn.addEventListener('click', openDrawer);
    closeSettingsBtn.addEventListener('click', closeDrawer);
    drawerOverlay.addEventListener('click', closeDrawer);

    // Navigation Mode Toggle (with Offline protection)
    const navModeToggle = document.getElementById('navModeToggle');
    navModeToggle.checked = isNavMode;
    navModeToggle.addEventListener('change', (e) => {
        if (!navigator.onLine && e.target.checked) {
            alert("Cannot enable Navigation Mode without an active internet connection.");
            e.target.checked = false;
            return;
        }

        isNavMode = e.target.checked;
        localStorage.setItem('setting_navMode', isNavMode);
        syncAutoRotateVisibility();

        if (isNavMode && currentMarkerPos) {
            map.panTo([currentMarkerPos.lat, currentMarkerPos.lng], { animate: true });
        } else if (!isNavMode) {
            const currentPolyline = ROUTES[activeRouteId].polylineCoords;
            map.fitBounds(L.polyline(currentPolyline).getBounds(), { padding: [80, 80], maxZoom: 16, animate: true });
        }
    });

    // Auto-Rotate Heading Toggle
    const autoRotateToggle = document.getElementById('autoRotateToggle');
    autoRotateToggle.checked = isAutoRotate;
    autoRotateToggle.addEventListener('change', (e) => {
        isAutoRotate = e.target.checked;
        localStorage.setItem('setting_autoRotate', isAutoRotate);
        if (!isAutoRotate) updateMapHeading(0);
    });

    // Show/Hide Checkpoints Toggle (Default: OFF)
    const showCheckpointsToggle = document.getElementById('showCheckpointsToggle');
    if (showCheckpointsToggle) {
        showCheckpointsToggle.checked = isShowCheckpoints;
        showCheckpointsToggle.addEventListener('change', (e) => {
            isShowCheckpoints = e.target.checked;
            localStorage.setItem('setting_showCheckpoints', isShowCheckpoints);

            // Rebuild only the checkpoint pin layer; keep drive progress intact.
            checkpointPinsLayer.clearLayers();
            if (isShowCheckpoints) {
                addCheckpointMarkers(ROUTES[activeRouteId]);
            }
        });
    }

    // Debug Mode Toggle (HUD only) — Default OFF
    const debugToggle = document.getElementById('debugToggle');
    if (debugToggle) {
        debugToggle.checked = isDebugMode;
        setDebugHudVisibility(isDebugMode);
        debugToggle.addEventListener('change', (e) => {
            isDebugMode = e.target.checked;
            localStorage.setItem('setting_debugMode', isDebugMode);
            setDebugHudVisibility(isDebugMode);
            if (isDebugMode) {
                // Seed the HUD with the current live state (1-based handled in render)
                renderDebugHud({
                    ts: Date.now(),
                    routeId: activeRouteId,
                    firedIndex: currentCheckpointIndex - 1,
                    expectedIndex: currentCheckpointIndex,
                    firedName: null,
                    nearestDist: null,
                    nearestIndex: null,
                    nextDist: null
                });
            }
        });
    }

    // Test helper: Jump to Nearest Checkpoint (exam continue without driving from #1)
    const jumpNearestBtn = document.getElementById('jumpNearestBtn');
    if (jumpNearestBtn) {
        jumpNearestBtn.addEventListener('click', () => {
            jumpToNearestCheckpoint();
        });
    }

    // Compass Button
    const compassBtn = document.getElementById('compassBtn');
    compassBtn.addEventListener('click', () => {
        updateMapHeading(0);
        if (currentMarkerPos) {
            map.panTo([currentMarkerPos.lat, currentMarkerPos.lng], { animate: true });
        }
    });

    // Demo Controls
    const demoModeToggle = document.getElementById('demoModeToggle');
    const demoControlBar = document.getElementById('demoControlBar');
    const demoPlayBtn = document.getElementById('demoPlayBtn');
    const demoRestartBtn = document.getElementById('demoRestartBtn');
    const demoCloseBtn = document.getElementById('demoCloseBtn');
    const demoVoiceBtn = document.getElementById('demoVoiceBtn');
    const demoVoiceIcon = document.getElementById('demoVoiceIcon');

    demoModeToggle.addEventListener('change', (e) => {
        demoControlBar.classList.toggle('active', e.target.checked);
        if (e.target.checked) {
            closeDrawer();
            startSimulation();
        } else {
            stopSimulation();
        }
    });

    demoCloseBtn.addEventListener('click', () => {
        stopSimulation();
        demoControlBar.classList.remove('active');
        demoModeToggle.checked = false;
    });

    demoPlayBtn.addEventListener('click', () => {
        if (simAnimationId) {
            pauseSimulation();
        } else {
            startSimulation();
        }
    });

    demoRestartBtn.addEventListener('click', () => {
        restartSimulation();
    });

    // One-tap Demo test: jump straight to pin #27 (~120m before it)
    // so #27->#28->#29->#30 all fire in order, no drive from start.
    const demoJump27Btn = document.getElementById('demoJump27Btn');
    if (demoJump27Btn) {
        demoJump27Btn.addEventListener('click', () => {
            startSimulationFromCheckpoint(27, 120);
        });
    }

    demoVoiceBtn.addEventListener('click', () => {
        isSimVoiceEnabled = !isSimVoiceEnabled;
        demoVoiceBtn.classList.toggle('active', isSimVoiceEnabled);
        demoVoiceBtn.classList.toggle('muted', !isSimVoiceEnabled);
        demoVoiceIcon.className = isSimVoiceEnabled ? 'fas fa-volume-high' : 'fas fa-volume-xmark';
    });

    document.querySelectorAll('.speed-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            document.querySelectorAll('.speed-pill').forEach(p => p.classList.remove('active'));
            pill.classList.add('active');
            simSpeedMultiplier = parseInt(pill.dataset.speed) || 1;
        });
    });

    // Themes
    document.querySelectorAll('.theme-chip').forEach(chip => {
        chip.addEventListener('click', () => {
            applyTheme(chip.dataset.theme);
        });
    });

    // Screen WakeLock
    if ('wakeLock' in navigator) {
        navigator.wakeLock.request('screen').catch(err => console.warn('WakeLock:', err));
    }
});