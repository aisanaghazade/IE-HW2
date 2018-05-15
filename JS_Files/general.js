/**
 * Created by aisanaghazade on 5/12/18.
 */

function minimize() {
    document.getElementById("chat_box").style.display = 'none';
}

function chatbox(){
    synchroousAjax();
    document.getElementById("chat_box").style.display = 'block';
    listening();
}

function send() {
    var xmlhttp = new XMLHttpRequest();
    var msg = document.getElementById("m_text").value;
    if (msg.length > 0){
        document.getElementById("m_text").value = '';
        var new_element = '<div class="customer_msg"> <span class="customer_img"> <img class="s_img" src="../icons/aisan.JPG"> </span> <span class = "msg_place">'+msg+' </span> </div>';
        document.getElementById("msg_box").innerHTML += new_element;
        document.getElementById("msg_box").scrollTop += 100;
        xmlhttp.open("post", "http://51.15.59.130:46260/send", true);
        var send_msg = {message : msg};
        xmlhttp.send(send_msg);
        listening();
    }
}

function synchroousAjax(){
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "http://51.15.59.130:46260/start", false);
    xmlhttp.send(null);
    if(xmlhttp.status == 200){
        xmlhttp.open("GET", "http://51.15.59.130:46260/support", false);
        xmlhttp.send(null);
        var response = xmlhttp.response;
        var text= JSON.parse(response);
        document.getElementById("supporterimg").innerHTML += '<img id="s1_img" src="' + text.support.picture + '">';
        support_img = text.support.picture;
        document.getElementById("name").innerHTML += text.support.first+ " " + text.support.last;
    }else{
        window.alert("Error: "+ xmlhttp.statusText);
    }
}

function process(){

    if(this.readyState == 4){
        if(this.status == 200){
            var response = this.responseText;
            var msg = JSON.parse(response);
            // var new_msg = "";
            for(i = 0; i < msg.responses.length; i++)
                    new_msg = msg.responses[i];

            if(new_msg.length > 0){
                var new_element = '<div class="service_msg"> <span class="service_img"> <img class="s1_img" src="'+ support_img +'"> </span> <span class = "msg_place">'+new_msg.message+' </span> </div>';
                document.getElementById("msg_box").innerHTML += new_element;
                document.getElementById("msg_box").scrollTop += 100;
            }

        }
        else{
            window.alert("Error: "+ this.statusText);
        }
    }
}

function get_new_msg() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = process;
    url = "http://51.15.59.130:46260/fetch"
    xmlhttp.open("GET",url,true);
    xmlhttp.send(null);
}

function listening() {
    setInterval(get_new_msg(),3000);
}