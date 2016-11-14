$(document).ready(function () {
    $.ajax({
        url: "http://localhost:3000/api",
        success: function (data) {
            let memo = []

            for (let i = 0; i < data.length; i++) {
                console.log(data[i])
                memo.push(`
                <tr id="rowMemo${data[i].id}">
                    <td>
                        <h3>
                            ${data[i].title}
                            <span class="pull-right">
                                <button id="edit$#{data[i].id}" name="editMemo" class="btn btn-warning">Edit</button>
                                <button id="delete#${data[i].id}" name="deleteMemo" class="btn btn-danger">Delete</button>
                            </span>
                        </h3>
                        <p>${data[i].description}</p>
                    </td>
                </tr>
                `)
            }

            $('#rowOfMemos').append(memo.join(""))
        }
    })
})