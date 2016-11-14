$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/api/memo",
        success: function (data) {
            let memo = []

            for (let i = 0; i < data.length; i++) {
                memo.push(`
                <tr id="rowMemo${data[i].id}">
                    <td>
                        
                        ${data[i].title}
                        <span class="pull-right">
                            <button id="edit$#${data[i].id}" name="editMemo" class="btn btn-warning">Edit</button>
                            <button id="delete#${data[i].id}" name="deleteMemo" class="btn btn-danger">Delete</button>
                        </span>
                    
                        <p>${data[i].description}</p>
                    </td>
                </tr>
                `)
            }

            $('#rowOfMemos').append(memo.join(""))
        }
    })
})

$(document).on('click', 'button[id="createMemo"]', function (e) {
    e.preventDefault()

    $.ajax({
        url: "http://localhost:3000/api/memo",
        method: "post",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            title: $('input[name="title"]').val(),
            description: $('input[name="description"]').val()
        },
        success: function (data) {
            let html = `
                <tr id="rowMemo${data.id}">
                    <td>
                       
                        ${data.title}
                        <span class="pull-right">
                            <button id="edit$#${data.id}" name="editMemo" class="btn btn-warning">Edit</button>
                            <button id="delete#${data.id}" name="deleteMemo" class="btn btn-danger">Delete</button>
                        </span>
                        
                        <p>${data.description}</p>
                    </td>
                </tr>
                `
            $("#rowOfMemos:last").append(html)
            $("input[name='title']").val("")
            $("input[name='description']").val("")
        }
    })
})

$(document).on('click', 'button[name="deleteMemo"]', function () {
    let tempId = this.id.split("#")
    let id = tempId[1]

    $.ajax({
        url: `http://localhost:3000/api/memo/${id}`,
        method: "delete",
        contentType: 'application/x-www-form-urlencoded',
        success: function () {
            $(`#rowMemo${id}`).remove()
            $("input[name='title']").val("")
            $("input[name='description']").val("")
        }
    })
})

$(document).on('click', 'button[name="editMemo"]', function () {
    let tempId = this.id.split("#")
    let id = tempId[1]

    $.ajax({
        url: `http://localhost:3000/api/memo/${id}`,
        method: "get",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id
        },
        success: function (data) {
            let title = `input[name=title]`
            let description = `input[name=description]`
            $("form").find(title).val(data.title)
            $("form").find(description).val(data.description)
            $("form").find("button[name=createMemo]").replaceWith("<button type='submit' name='updateMemo' class='btn btn-default'>Update</button>")

            let temp = $("input[name='id']").val()
            if ( typeof temp != "undefined") {
                $("input[name='id']").replaceWith(`<input type='hidden' class='form-control' name='id' value='${data.id}'>`)
            }
            else {
                $(".form-group:first").append(`<input type='hidden' class='form-control' name='id' value='${data.id}'>`)
            }
        }
    })
})

$(document).on('click', 'button[name="updateMemo"]', function (e) {
    e.preventDefault()
    let id = $("input[name='id']").val()
    let title = $("input[name='title']").val()
    let description = $("input[name='description']").val()

    $.ajax({
        url: "http://localhost:3000/api/memo",
        method: "put",
        contentType: 'application/x-www-form-urlencoded',
        data: {
            id: id,
            title: title,
            description: description
        },
        success: function (data) {
            let html =
                `
                <tr id="rowMemo${data.id}">
                    <td>
                        ${data.title}
                        <span class="pull-right">
                            <button id="edit$#${data.id}" name="editMemo" class="btn btn-warning">Edit</button>
                            <button id="delete#${data.id}" name="deleteMemo" class="btn btn-danger">Delete</button>
                        </span>
                        <p>${data.description}</p>
                    </td>
                </tr>
                `
            $(`#rowMemo${data.id}`).replaceWith(html)

            $("form").find("button[name=updateMemo]").replaceWith("<button type='submit' name='createMemo' class='btn btn-default'>Create</button>")
            $("input[name='title']").val("")
            $("input[name='description']").val("")
        }
    })
})