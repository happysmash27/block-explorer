function refreshRich(){$.ajax({url:"http://104.251.219.215:8080/api/richlist",success:function(e,t,a){$("#richA1").text(e.richlist[1].balance),$("#richB1").text(e.richlist[1].address),$("#richB1").attr("href","search.html#"+e.richlist[1].address),$("#richA2").text(e.richlist[2].balance),$("#richB2").text(e.richlist[2].address),$("#richB2").attr("href","search.html#"+e.richlist[2].address),$("#richA3").text(e.richlist[3].balance),$("#richB3").text(e.richlist[3].address),$("#richB3").attr("href","search.html#"+e.richlist[3].address),$("#richA4").text(e.richlist[4].balance),$("#richB4").text(e.richlist[4].address),$("#richB4").attr("href","search.html#"+e.richlist[4].address),$("#richA5").text(e.richlist[5].balance),$("#richB5").text(e.richlist[5].address),$("#richB5").attr("href","search.html#"+e.richlist[5].address)}})}function refreshData(){$.ajax({url:"http://104.251.219.215:8080/api/last_tx/5",success:function(e,t,a){$(".dimmer").hide(),drawTxTable(e)}}),$.ajax({url:"http://104.251.219.215:8080/api/last_block/5",success:function(e,t,a){drawBlockTable(e)}}),$.ajax({url:"http://104.251.219.215:8080/api/stats",success:function(e,t,a){drawStats(e)}})}function drawStats(e){$("#network").text(e.network);var t=moment.duration(e.network_uptime,"seconds").format("d[d] h[h] mm[min]");$("#uptime").text(t),$("#nodes").text(e.nodes);var t=moment.duration(e.block_time_variance,"seconds");t=Math.round(t/10)/100,$("#variance").text(t+"s");var t=moment.duration(e.block_time,"seconds").format("s[s]");$("#blocktime").text(t),$("#blockheight").text(e.blockheight),$("#validators").text(e.stake_validators),$("#PCemission").text(e.staked_percentage_emission+"%"),$("#epoch").text(e.epoch);var t=e.emission;t=Math.round(1e4*t)/1e4,$("#emission").text(t);var t=e.unmined;t=Math.round(1e4*t)/1e4,$("#unmined").text(t),$("#reward").text(e.block_reward)}function drawTxTable(e){$("#TxT").DataTable().clear(),_.each(e.transactions,function(e){drawTxRow(e.timestamp,e.amount,e.txhash,e.block)})}function drawBlockTable(e){$("#BlT").DataTable().clear(),_.each(e.blocks,function(e){drawBlockRow(e.timestamp,e.number_transactions,e.blockhash,e.blocknumber)})}function drawTxRow(e,t,a,r){var i=moment.unix(e),s=$("#TxT").DataTable();i.isValid()?s.row.add([i.fromNow(),t,a,r,e]).draw(!0):s.row.add(["unconfirmed",t,a,r,e]).draw(!0)}function drawBlockRow(e,t,a,r){var i=moment.unix(e);$("#BlT").DataTable().row.add([i.fromNow(),t,a,r,e]).draw(!0)}$(document).ready(function(){$(".tabular.menu .item").tab(),$("#BlT").DataTable({select:!0,paging:!1,info:!1,searching:!1,lengthChange:!1,order:[[4,"dec"],[3,"dec"]],columnDefs:[{orderable:!1,targets:0},{orderable:!1,targets:1},{orderable:!1,targets:2},{orderable:!1,targets:3},{targets:[4],visible:!1,searchable:!1}],rowReorder:{enable:!1}}),$("#TxT").DataTable({select:!0,paging:!1,info:!1,searching:!1,lengthChange:!1,order:[[4,"dec"],[3,"dec"]],columnDefs:[{orderable:!1,targets:0},{orderable:!1,targets:1},{orderable:!1,targets:2},{orderable:!1,targets:3},{targets:[4],visible:!1,searchable:!1}],rowReorder:{enable:!1}}),$(".table").on("click",function(e){var t=$(this).DataTable(),a=t.rows(e.target._DT_CellIndex.row).data();"BlT"==e.currentTarget.id?($("#domModalTitle").text("Blockhash clicked"),$("#domModalBody").text("Blockhash: "+a[0][2]),$("#domModal").modal("show")):doSearch(a[0][2])}),refreshData(),refreshRich()}),window.setInterval(function(){refreshData()},5e3),window.setInterval(function(){refreshRich()},2e4);