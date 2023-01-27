import "./index.css";

export default () => {
    return <div className="privacy">
        <div className="header">
            <h1>「Zark 每日單字查詢器」之隱私權政策</h1>
            <h5>修訂日期: 2023/01/21 17:13 UTC+8</h5>
        </div>

        <div className="body">
            <div>
                <h3>前言</h3>
                <p>為了保障您的隱私權益，我們製作了這份說明檔案。您將會在此份檔案中了解到我們處理您的資料的方式，您亦可與我們討論您的資料如何被我們使用。閱讀此文件以保護您的權益。</p>
            </div>

            <div>
                <h3>聯繫</h3>
                <p>您可以透過以下管道聯繫我們:</p>
                <ul>
                    <li>Github: <a href="https://github.com/TWMSSS">@TWMSSS</a></li>
                    <li>TWMSSS 主要聯繫 Twitter: <a href="https://twitter.com/kamiyurisaka">@kamiyurisaka</a></li>
                    <li>開發者 Yurisaka 的電子郵件: <a href="mailto:yurisakadev@gmail.com">yurisakadev@gmail.com</a></li>
                    <li>開發者 Muisnow 之 Twitter: <a href="https://twitter.com/Hen000000hen">@Hen000000hen</a></li>
                    <li>開發者 Muisnow 的電子郵件: <a href="mailto:hen20090325@gmail.com">hen20090325@gmail.com</a></li>
                </ul>
            </div>

            <div>
                <h3>資料的儲存</h3>
                <p>由於這個應用程式僅於您的瀏覽器上執行，且無須後端伺服器執行(我們的應用程式託管於Github Pages上)，因此無須擔心您的資料會被儲存到我們遠端的伺服器上。亦我們的應用程式是與三恣網路共同開發，因此我們必須遵守<a href="https://www.3zh-studio.com/service/privacy">《三恣網路隱私權政策》</a>。</p>
                <p>您的大部分資料(除您於您的裝置上儲存可離線存取之資料外)會在您關閉瀏覽器(或關閉這個網頁程式)時自動清除。因此無須擔心您的資料會於您不知道的時候被使用、瀏覽。</p>
            </div>

            <div>
                <h3>資料的使用</h3>
                <p>暫存於瀏覽器的資料儘用於分析「固定格式的Sheet檔案」，因此我們(與您)無法使用這個網頁程式來解析其他的檔案。為了保障您的資料安全，我們的網頁程式會在發現該檔案並非為適用各式檔案時，自動停止解析並移除暫存，因此您可以放心的在這個網頁程式上解析您的檔案。</p>
                <p>您可以自行決定是否要將資料儲存於您的裝置上，我們無權修改您於裝置上之資料，一切將交由您來決定。</p>
            </div>

            <div>
                <h3>資料的分享</h3>
                <p>我們的應用程式是與三恣網路共同開發，因此我們必須遵守<a href="https://www.3zh-studio.com/service/privacy">《三恣網路隱私權政策》</a>，且該條約限制我們不能在未經授權的情況下與第三方分享您的「所有」資料，因此我們向您保證我們絕不會與第三方分享您的資料，且由於我們並不會於遠端伺服器上儲存您所使用的檔案，因此我們亦無法與第三方分享您的檔案。您可以放心使用這個網頁程式來解析您的檔案。</p>
            </div>

            <div>
                <h3>Google OAuth</h3>
                <p>我們使用Google OAuth登入您的Google帳號，在此情況下我們絕對遵守<a href="https://developers.google.com/terms/api-services-user-data-policy#additional_requirements_for_specific_api_scopes">《Google API Services User Data Policy》</a>。</p>
                
                <h4>登入資料的儲存</h4>
                <p>我們不會主動的儲存您的登入資料(或是登入憑證)至我們的遠端伺服器。</p>

                <h4>登入資料的使用</h4>
                <p>我們不會主動查看您的Google帳號之內容。您在登入Google至這個網頁程式後，您可以選擇您想提供給網頁程式的資料，您未選擇的檔案我們則完全不會進行任何操作。</p>

                <h4>登入資料的分享</h4>
                <p>由上面的條例與<a href="https://www.3zh-studio.com/service/privacy">《三恣網路隱私權政策》</a>所限制，我們不會在未您的經授權的情形下與第三方分享您的使用者資料。</p>
            </div>
        </div>
    </div>
}