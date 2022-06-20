const setlocastroe = function (key, val)  {
	localStorage.setItem(key, val)
}

const getlocastroe = function (key) {
	return localStorage.getItem(key)
}

export default { 
	setlocastroe,
	getlocastroe
}
