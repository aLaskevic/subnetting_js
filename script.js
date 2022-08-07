var index = 1;
var table = document.getElementById("table");
document.getElementById("error").style.display = "none";
document.getElementById("submit").addEventListener("click", () => {
    var networkaddress = document.getElementById("network");
    var subnet = document.getElementById("subnet");

    var errorMessage = ""
    //Is Subnetmask in [0-32]?
    if(subnet.value < 0 || subnet.value > 32){
        errorMessage += "- The subnetmask is invalid! </br>"
    }

    //is IP-Address Valid?
    if(!/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(networkaddress.value)){
        errorMessage += "- The network address is invalid!"
    }

    if(errorMessage != ""){
        document.getElementById("error").style.display = "block";
        document.getElementById("error").innerHTML = errorMessage
        return;
    }
    else{
        document.getElementById("error").style.display = "none";
    }

    var occtet = networkaddress.value.split(".");
    

    var rest = 2**(32 - subnet.value)
    var ipSum = Number(occtet[0])*(256**3) + Number(occtet[1])*(256**2) + Number(occtet[2])*(256**1) + Number(occtet[3]) + rest
    let newoct = [0,0,0,0]

    for(var i = 0; i <= 3; i++){
        newoct[i] = Math.floor(ipSum/(256**(3-i)))
        ipSum = ipSum % (256**(3-i))
    }

    var newEntry = table.insertRow(index);
    var id = newEntry.insertCell(0);
    var Tnetworkaddress = newEntry.insertCell(1);
    var firstIP = newEntry.insertCell(2);
    var lastIP = newEntry.insertCell(3);
    var broadcast = newEntry.insertCell(4);
    var subnetmask = newEntry.insertCell(5);
    
    id.innerHTML =  index;
    Tnetworkaddress.innerHTML = networkaddress.value;
    firstIP.innerHTML = occtet[0] + "." + occtet[1] + "." +occtet[2] + "." + (Number(occtet[3]) + Number(1));
    lastIP.innerHTML = newoct[0] + "." + newoct[1] + "." + newoct[2] + "." + (Number(newoct[3]) - Number(1));
    broadcast.innerHTML = newoct[0] + "." + newoct[1] + "." + newoct[2] + "." + newoct[3];
    subnetmask.innerHTML = "/" + subnet.value;
    index++;
    });