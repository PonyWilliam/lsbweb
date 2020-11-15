var calc = {
	Distance:function(lat_a,lng_a,lat_b,lng_b){
		let pk = 180/3.14169
		let a1 = lat_a/pk
		let a2 = lng_a/pk
		let b1 = lat_b/pk
		let b2 = lng_b/pk
		let t1 = Math.cos(a1) * Math.cos(a2) * Math.cos(b1) * Math.cos(b2);
		let t2 = Math.cos(a1) * Math.sin(a2) * Math.cos(b1) * Math.sin(b2);
		let t3 = Math.sin(a1) * Math.sin(b1)
		let tt = Math.acos(t1 + t2 + t3);
		console.log(lat_a,lat_b,lng_a,lng_b)
		
		return (6378.137* tt).toFixed(2)
	}
}
export {calc}