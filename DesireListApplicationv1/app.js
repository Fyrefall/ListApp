var currentList = {};

function createNewList() {
    currentList.name = $("#desireListName").val();
    currentList.items = new Array();
    //Web Service Call


    showList();
    
}

function showList() {
    $("#desireListTitle").html(currentList.name);
    $("#desireListItems").empty();


    $("#newDesireListDiv").hide(); //switch views
    $("#desireListDiv").show();

    $("#newItemName").focus();
    $("#newItemName").keyup(function (event) {
        if (event.keyCode == 13) {
            addListItem();
            console.info(event.keyCode);
        }
    });
}

function addListItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    currentList.items.push(newItem);
    console.info(currentList);

    drawItems();
    $("#newItemName").val("");
}

function drawItems() {
    var $list = $("#desireListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>D</button>").appendTo($li);
        var $createBtn = $("<button onclick='checkItem(" + i + ")'>C</button>").appendTo($li);

        $li.appendTo($list);
    }

}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    }
    else {
        $("#item_" + index).addClass("checked");
    }

    
}

function getListById(id) {
    console.info(id);

    //Test db data
    currentList.name = "Test List name";
    currentList.items = [
        { name: "Milk" },
        { name: "Bread" },
        { name: "Ham" }
    ];

    showList();
    drawItems();
}

$(document).ready(function () {
    console.info("ready");
    $("#desireListName").focus();
    $("#desireListName").keyup(function (event) {
        if (event.keyCode == 13) {
            createNewList();
        }
    });


    var pageUrl = window.location.href;
    var idIndex = pageUrl.indexOf("?id=");
    if (idIndex != -1) {
        getListById(pageUrl.substring(idIndex + 4));
    }
});