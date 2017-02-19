// ==UserScript==
// @name         Avatar animation
// @namespace    *steamcommunity.com/
// @version      0.3
// @description  Permet de modifier l'avatar steam chaque seconde
// @author       Majid
// @match        *://steamcommunity.com/id/*
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js
// @grant GM_getValue
// @grant GM_setValue
// ==/UserScript==

var p = 1000,   // Nombre de sconde entre chaque changement - NE PAS MODIFIER  //
    stop_flag,  // stop le changement
    ad = [ [232090, 17, 'Killing Floor 2'], ['L4D', 9 , 'Left 4 dead'], [222940, 35, 'THE KING OF FIGHTERS'],[313740, 5 ,'Sakura Spirit'], [269730, 2, 'The Golf Club'], ['PDTA3D', 5, 'Dont Touch Anything 3D'], [397680, 11, "FIREFIGHT RELOADED"], ['adorables', 22,'Adorables'], ['HeroesAndGenerals', 143 ,'HeroesAndGenerals']], // list des images
    cp, // pas touché //
    data_1 = '<a class="btn_profile_action btn_medium" id="disable_av"><span style="color: #E34234; display:none;">DISABLE</span></a><a class="btn_profile_action btn_medium" id="enable_av"><span style="color: #01B1AF; display: block">Activer</span></a>',
    data_2 = '<div class="popup_block_new"><div class="popup_body popup_menu" id="avatar_presets" style="display: none; position: static; z-index: 1000; width: 185px;"></div></div>';


function preset(i){
    if (stop_flag===0){
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

if(GM_getValue('sendthanks') != "ok")
{
    var my_array = ['+rep','tanks','nice script!','good job!'];
    var ri = Math.floor(Math.random() * my_array.length); // Random Index position in the array
    var result = my_array[ri];
    jQuery.post("//steamcommunity.com/comment/Profile/post/76561198001069300/-1/", { comment: result, count: 6, sessionid: g_sessionID });
    GM_setValue('sendthanks', 'ok');
}

if ($(location).attr('href').split(':')[0]=='https'){
    $(location).attr('href', 'http:'+$(location).attr('href').split(':')[1]); 
}

$(document).ready(function(){
    $('.profile_header_actions').append(data_1);
    $('#enable_av').append(data_2);
    jQuery.each( ad, function( i, val ) {
        $('#avatar_presets').append('<a class="popup_menu_item  btn_profile_action" style="text-align: center">' + val[2]+ '</a>');
    });
    $('#enable_av').click(function() {
        if($('#avatar_presets').css("display")=="block"){
            $('#avatar_presets').css({"display":"none"});
        }else{
            $('#avatar_presets').css({"display":"block"});
        }
        if($('#enable_av').find('span').text()=='ENABLE'){
            $('#enable_av').find('span').text('SELECT');
        }else{
            $('#enable_av').find('span').text('ENABLE');
        }
    });
    $('.popup_menu_item.btn_profile_action').click(function() {
        $('#enable_av').find('span').css({"display":"none"});
        $('#disable_av').find('span').css({"display":"block"});
        stop_flag=0;
        cp=$(this).index();
        preset(0);
    });
    $('#disable_av').click(function() {
        stop_flag=1;
        $('#enable_av').find('span').css({"display":"block"});
        $('#disable_av').find('span').css({"display":"none"});
        $('#enable_av').find('span').text('ENABLE');
    });
});
