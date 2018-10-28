var currentList = {};

function createNewList() {
    currentList.name = $("#desireListName").val();
    currentList.items = new Array();


    //Web Service Call
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ItemList/",
        data: currentList,
        success: function (result) {
            showList();
        }
    });
    
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
    newItem.listId = currentList.id;

    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/Item/",
        data: newItem,
        success: function (result) {
            currentList = result;
            drawItems();
            $("#newItemName").val("");
        }
    });

    //currentList.items.push(newItem);
    //console.info(currentList);

    //drawItems();
    //$("#newItemName").val("");
}

function drawItems() {
    var $list = $("#desireListItems").empty();

    for (var i = 0; i < currentList.items.length; i++) {
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>D</button>").appendTo($li);
        var $createBtn = $("<button onclick='checkItem(" + currentItem.id + ")'>C</button>").appendTo($li);

        if (currentItem.checked) {
            $li.addClass("checked");
        }

        $li.appendTo($list);
    }

}

function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(itemId) {
    //var item = currentList.items[index];
    //item.checked = !item.checked;

    var changedItem = {};

    for (i = 0; i < currentList.items.length; i++) {
        if (currentList.items[i].id == itemId) {
            changedItem = currentList.items[i];
        }
    }

    changedItem.checked = !changedItem.checked;

    $.ajax({
        type: "PUT",
        dataType: "json",
        url: "api/Item/" + itemId,
        data: changedItem,
        success: function (result) {
            currentList = result;
            drawItems();
        }
    });
}

function getListById(id) {

    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ItemList/" + id,
        success: function (result) {
            currentList = result;
            showList();
            drawItems();
        }
        //,
        //error: function () {
        //    console.error("Something wen't wrong");
        //}
    });

    /*
    Code not needed anymore
    */
    //console.info(id);

    ////Test db data
    //currentList.name = "Test List name";
    //currentList.items = [
    //    { name: "Milk" },
    //    { name: "Bread" },
    //    { name: "Ham" }
    //];

    //showList();
    //drawItems();
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