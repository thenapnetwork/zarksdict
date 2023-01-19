const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_TOKEN;
const GOOGLE_OAUTH_CLIENT_ID = process.env.REACT_APP_GOOGLE_OAUTH_CLIENT_ID;
const SCOPES = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/spreadsheets.readonly',
    'https://www.googleapis.com/auth/drive.metadata.readonly'
].join(" ");
const DISCOVERY_DOC = 'https://sheets.googleapis.com/$discovery/rest?version=v4';
const Inited = {
    API: false,
    OAuth: false
};

let AuthClient = null;
let LoginStatus = false;

export const status = () => Inited;
export const OAuthClient = () => AuthClient;
export const isLogined = () => LoginStatus;

export const initAPI = () => {
    if (Inited.API) return;

    function GApiLoad(api) {
        return new Promise((res) => {
            gapi.load(api, res);
        });
    }

    return new Promise(async (res) => {
        await Promise.all([GApiLoad("picker"), GApiLoad("client")]);
        await gapi.client.init({
            apiKey: GOOGLE_API_KEY,
            discoveryDocs: [DISCOVERY_DOC],
        });

        Inited.API = true;

        res();
    });
}

export const initOAuth = async (loginCallback = () => { }) => {
    if (Inited.OAuth) return;

    const client = google.accounts.oauth2.initTokenClient({
        client_id: GOOGLE_OAUTH_CLIENT_ID,
        scope: SCOPES,
        ux_mode: 'popup',
        callback: (response) => {
            gapi.client.setToken({
                access_token: response.access_token
            });
            LoginStatus = true;

            loginCallback(response);
        }
    });

    Inited.OAuth = true;
    AuthClient = client;
}

export const FilePicker = (type = google.picker.ViewId.SPREADSHEETS) => {
    return new Promise((res) => {
        const picker = new google.picker.PickerBuilder()
            .setOAuthToken(gapi.client.getToken().access_token)
            .addView(type)
            .enableFeature(google.picker.Feature.NAV_HIDDEN)
            .setCallback((data) => {
                if (data[google.picker.Response.ACTION] != google.picker.Action.PICKED) return;
                res(data)
            })
            .build();

        picker.setVisible(true);
    });
}

export const getSheetsList = (sheetID) => {
    return new Promise((res, rej) => {
        const PARAMS = {
            spreadsheetId: sheetID,
            range: [],
            includeGridData: false
        };

        var request = gapi.client.sheets.spreadsheets.get(PARAMS);
        request.then(res, rej);
    });
}

export const getSheet = (sheetID, thisRange) => {
    return new Promise(async (res, rej) => {
        const PARAMS = {
            spreadsheetId: sheetID,
            range: thisRange,
            includeGridData: true
        };

        var request = gapi.client.sheets.spreadsheets.values.get(PARAMS);
        request.then(res, rej);
    });
}

export const Logout = () => {
    gapi.client.setToken();
    LoginStatus = false;
}