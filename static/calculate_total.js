var MESSAGE = '';
var TOTAL = 0;



function calculateTotal(){
    MESSAGE = '';
    TOTAL = 0;

    get_shed_details();

    get_doors_costs();

    get_window_costs();

    get_interior_options();

    MESSAGE += '<b>Additional Options</b>';
    MESSAGE += '<br/>';

    var final_message = '';
    final_message += '<b>Estimate: $'+ String(TOTAL) +'</b><br\>';
    final_message += MESSAGE;

    $('.totalcost').closest('.card').find('.btn-link .card-header div').html('YOUR ESTIMATE: $' + String(TOTAL) + ' <br/>(expand for details)');
    $('.totalcost').html(final_message);
}


function get_shed_details(){
    var message = '';
    var total = 0;

    var shedPrice = 0;
    var length = parseInt(HOUSE.size.split('x')[1]);

    if (HOUSE.sidingType == 'wall'){
        shedPrice = SHEDMAP[HOUSE.style][HOUSE.size]['vinylPrice'];
    } else {
        shedPrice = SHEDMAP[HOUSE.style][HOUSE.size]['price'];
    }
    total += shedPrice;

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

    MESSAGE += message;
    TOTAL += total;
}


function get_doors_costs(){
    var message = '';
    var total = 0;

    var is_garage = [];
    var default_doors = 0;
    var default_garage_doors = 0;
    if (SHEDOBJECTSMAP[HOUSE.style]['doors']){
        is_garage = SHEDOBJECTSMAP[HOUSE.style]['isGarage'];
        for (var i=0; i<SHEDOBJECTSMAP[HOUSE.style]['doors']['positions'].length; i++){
            if (!is_garage[i]){
                default_doors += 1
            } else {
                default_garage_doors += 1;
            }
        }
    }
    var found_doors = 0;
    var found_garage_doors = 0;

    message += '<b>Doors & Ramps</b>';

    var ALL_DOORS = [];
    ALL_DOORS.push(...DOORS);
    ALL_DOORS.push(...GARAGEDOORS);

    for (var i in ALL_DOORS){
        var name = ALL_DOORS[i].longName.replace(/_/g,' ');

        found = false;
        if (found_doors < default_doors && ALL_DOORS[i].name == 'Six_Panel_Door'){
            found_doors += 1;
            message += '<div>' + name + ': $' + 0 + '</div>';
            found = true;
        }

        if (!found && found_garage_doors < default_garage_doors && ALL_DOORS[i].name == 'garage_9_7_no_window'){
            found_garage_doors += 1;
            message += '<div>' + name + ': $' + 0 + '</div>';
            found = true;
        }

        if (!found && SHEDOBJECTSMAP[HOUSE.style]['doors']['names'] && ALL_DOORS[i].name == SHEDOBJECTSMAP[HOUSE.style]['doors']['names'][i]['name']){
            if (is_garage[i]){
                found_garage_doors += 1;
            } else {
                found_doors += 1;
            }

            message += '<div>' + name + ': $' + 0 + '</div>';
            found = true;
        }

        if (!found) {
            var doorCost = DOOR_COSTS[ALL_DOORS[i].longName];
            var sillCost = SILL_COSTS[ALL_DOORS[i].longName];

            total += doorCost;

            message += '<div>' + name + ': $' + doorCost + '</div>';
            if (ALL_DOORS[i].diamond == '1'){
                message += '<div>Protector Diamond Plate Door Sill: $' + sillCost + '</div>';
                total += sillCost;
            }
        }
    }

    message += '<br/>';

    MESSAGE += message;
    TOTAL += total;
}


function get_window_costs(){
    var message = '';
    var total = 0;

    var default_windows = 0;
    if (SHEDOBJECTSMAP[HOUSE.style]['windows']){
        default_windows = SHEDOBJECTSMAP[HOUSE.style]['windows']['positions'].length;
    }

    var found_windows = 0;

    message += '<b>Windows & Accessories</b>';
    var windowsCost = 0;
    for (var i in WINDOWS){
        if (found_windows < default_windows && HOUSE.style && DEFAULT_WINDOW_TYPES[HOUSE.style].indexOf(WINDOWS[i].name) > -1){
            found_windows += 1;
            message += '<div>'+ WINDOWS[i].type +': $'+ String(0) +'</div>';
        }
        else {
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
            } else if (window.type == 'Aluminum Panes at 30"x36"'){
                windowCost = 75;
            } else if (window.type == 'Aluminum Panes at 30"x36" Insulated'){
                windowCost = 150;
            }

            message += '<div>'+ WINDOWS[i].type +': $'+ String(windowCost) +'</div>';
            windowsCost += windowCost;
        }
    }

    total += windowsCost;

    found_shutters = 0;

    if (WINDOWS.length > 0 && WINDOWS[0].shutters){
        if (found_shutters < found_windows){
            found_shutters += 1;
            total += WINDOWS.length * 30;
            message += '<div>Included Shutters: $'+ String(WINDOWS.length * 0) +'</div>';
        }
        else {
            total += WINDOWS.length * 30;
            message += '<div>Additional Shutters: $'+ String(WINDOWS.length * 30) +'</div>';
        }
    }
    message += '<br/>';

    MESSAGE += message;
    TOTAL += total;
}


function get_interior_options(){
    var message = '';
    var total = 0;

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

    MESSAGE += message;
    TOTAL += total;
}