
function calculateTotal(){
    var total = 0;
    var length = parseInt(HOUSE.size.split('x')[1]);

    var shedPrice = 0;
    if (HOUSE.sidingType == 'wall'){
        shedPrice = SHEDMAP[HOUSE.style][HOUSE.size]['vinylPrice'];
    } else {
        shedPrice = SHEDMAP[HOUSE.style][HOUSE.size]['price'];
    }
    total += shedPrice;

    var message = '';
    message += '<b>Structure Details</b>';
    message += '<div>'+ HOUSE.size +' '+ HOUSE.styleText +': $'+ shedPrice +'</div>';

    if (HOUSE.hasGable){
        message += '<div>Gable Vents: $50</div>';
        total += 50
    }
    if (HOUSE.hasRidge){
        message += '<div>Ridge Vent: $50</div>';
        total += 50
    }
    if (HOUSE.smartside){
        if (length in SMARTSIDE_COSTS){
            total += SMARTSIDE_COSTS[length];
            message += '<div>Smartside Package: $'+ SMARTSIDE_COSTS[length] +'</div>';
        }
    }

    message += '<br/>';

    message += '<b>Doors & Ramps</b>';
    for (var i in DOORS){
        var name = DOORS[i].longName.replace(/_/g,' ');

        var doorCost = DOOR_COSTS[DOORS[i].longName];
        var sillCost = SILL_COSTS[DOORS[i].longName];

        total += doorCost;

        message += '<div>' + name + ': $' + doorCost + '</div>';
        if (DOORS[i].diamond == '1'){
            message += '<div>Protector Diamond Plate Door Sill: $' + sillCost + '</div>';
            total += sillCost;
        }
    }
    message += '<br/>';

    message += '<b>Windows & Accessories</b>';
    var windowsCost = 0;
    for (var i in WINDOWS){
        var windowCost = 0;
        var window = WINDOWS[i];

        if (window.type == 'Aluminum Panes at 18"x24"'){
            windowCost = 45;
        } else if (window.type == 'Aluminum Panes at 24"x36"'){
            windowCost = 65;
        } else if (window.type == 'Aluminum Panes at 24"x36" Insulated'){
            windowCost = 150;
        } else if (window.type == 'Vinyl Panes at 18"x24"'){
            windowCost = 45;
        } else if (window.type == 'Vinyl Panes at 24"x36"'){
            windowCost = 65;
        } else if (window.type == 'Vinyl Panes at 24"x36" Insulated'){
            windowCost = 150;
        }

        message += '<div>'+ WINDOWS[i].type +': $'+ String(windowCost) +'</div>';
        windowsCost += windowCost;
    }

    total += windowsCost;

    if (WINDOWS.length > 0 && WINDOWS[0].shutters){
        total += WINDOWS.length * 30;
        message += '<div>Shutters: $'+ String(WINDOWS.length * 30) +'</div>';
    }
    message += '<br/>';

    message += '<b>Flooring & Interior</b>';

    var width = parseInt(HOUSE.size.split('x')[0]);
    var depth = parseInt(HOUSE.size.split('x')[1]);

    if (INTERIOR_OPTIONS['rightloft'] != 0){
        var value = width * INTERIOR_OPTIONS['rightloft'];
        total += value;

        message += '<div>'+ INTERIOR_STRINGS['rightloft'] +': $'+ String((value).toFixed(2)) +'</div>';
    }
    if (INTERIOR_OPTIONS['leftloft'] != 0){
        var value = width * INTERIOR_OPTIONS['leftloft'];
        total += value;

        message += '<div>'+ INTERIOR_STRINGS['leftloft'] +': $'+ String((value).toFixed(2)) +'</div>';
    }
    if (INTERIOR_OPTIONS['shelving'] != 0){
        var value = width * INTERIOR_OPTIONS['shelving'];
        total += value;

        message += '<div>'+ INTERIOR_STRINGS['shelving'] +': $'+ String((value).toFixed(2)) +'</div>';
    }
    if (INTERIOR_OPTIONS['workbenches'] != 0){
        var value = 65 * INTERIOR_OPTIONS['workbenches'];
        total += value;

        message += '<div>Workbench 30" x 5: $'+ String((value).toFixed(2)) +'</div>';
    }
    if (INTERIOR_OPTIONS['floor'] != 0){
        var value = width * depth * INTERIOR_OPTIONS['floor'];
        total += value;

        message += '<div>Flooring, '+ INTERIOR_STRINGS['floor'] +': $'+ String((value).toFixed(2)) +'</div>';
    }
    if (INTERIOR_OPTIONS['joist'] != 0){
        var value = width * depth * INTERIOR_OPTIONS['joist'];
        total += value;

        message += '<div>Floor Joists, '+ INTERIOR_STRINGS['joist'] +': $'+ String((value).toFixed(2)) +'</div>';
    }


    message += '<br/>';

    message += '<b>Additional Options</b>';
    message += '<br/>';

    var final_message = '';
    final_message += '<b>Estimate: $'+ String(total) +'</b><br\>';
    final_message += message;

    $('.totalcost').closest('.card').find('.btn-link .card-header div').html('YOUR ESTIMATE: $' + String(total) + ' <br/>(expand for details)');
    $('.totalcost').html(final_message);
}
