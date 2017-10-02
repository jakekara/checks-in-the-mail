const DATA_URL = "data/checks.tsv"

d3.tsv(DATA_URL, function(data){
    console.log("Here's the data", data);

    var container = d3.select("#container");
    
    var check_area = container.append("div").classed("check-area", true);

    var check_comparison = check_area.selectAll(".check-comparison")
	.data(data)
	.enter()
	.append("div")
	.classed("check-comparison", true);

    check_comparison.append("h5")
	.text(function(d){
	    var more = false;
	    if (Number(d["2017"])  > Number(d["2016"])){
		more = true;
	    }

	    console.log(d["2017"], d["2016"],
			Number(d["2017"])  > Number(d["2016"]));

	    var ret =  d["Month"] + ": "
		+ " about "
		+ numeral(Math.abs(d["2017"] - 
				   d["2016"]))
		.format("$0a")
		.toUpperCase(); 

	    if (more == true) ret += " more ";
	    else ret += " less ";

	    ret += " sent to towns";

	    return ret;

	    
	});

    var draw_check = function(check, year){

	var other_year = function(){
	    if (year == "2016") return "2017";
	    return "2016";
	}

	check.classed("check", true)
	    .classed("less", function(d){
		if (Number(d[year])
		    <
		    Number(d[other_year()]))
		    return true;
		return false;
	    })
	    .classed(year, true)
	    .attr("data-memo", function(d){ return d["Memo"]; })
	    .each(function(d){
		console.log("data 2016", d);
	    });

	var clear = function(){
	    check.append("div").classed("clear-both", true);
	}

	var date_box = check.append("div")
	    .classed("date-box", true)
	    .classed("check-field", true)
	    .html(function(d){
		return "<span class='check-label'>Date:</span>"
		+ d["Month"] + " " + String(year); });

	clear();
	
	var amt_numeric = check.append("div")
	    .classed("amount-numeric-box", true)
	    .classed("check-field", true)
	    .html(function(d){
		return "<span class='check-label'>Amt:</span>"
		+ numeral(d[year]).format("$0,000,000").toUpperCase();
	    });
	
	clear();
	
	var payto = check.append("div")
	    .classed("pay-to-box", true)
	    .classed("check-field", true)
	    .html(function(d){
		return "<span class='check-label'>Payable to:</span>"
		    + (d["Pay to"] || "Connecticut towns"); });

	clear();

	var amt_spelled_out = check.append("div")
	    .classed("amount-spelled-box", true)
	    .classed("check-field", true)
	    .html(function(d){
		return ""
		    + "<span class='check-label'>Amount:</span>"		
		    + d[year + "_spelled"]

		

	    });

	clear();

	var memo = check.append("div")
	    .classed("memo-box", true)
	    .classed("check-field", true)
	    .html(function(d){
		return "<span class='check-label'>Memo:</span>"
		+  d["Memo"] });

	var sig = check.append("div")
	    .classed("signature-box", true)
	    .classed("check-field", true)
	    .append("img")
	    .attr("src", function(d){
		
		if (Number(d[year])
		    <
		    Number(d[other_year()]))
		    return "img/malloy_sig_red.png";
		return "img/malloy_sig_blue.png";

	    });

	clear();

	
		  
    };

    draw_check(check_comparison.append("div"), "2016");
    draw_check(check_comparison.append("div"), "2017");

    check_comparison.append("div").classed("clear-both", true);

    // var check_2017 = check_comparison.append("div").classed("check", true)
    // 	.each(function(d){
    // 	    console.log("data 2017", d);
    // 	});
    

});
