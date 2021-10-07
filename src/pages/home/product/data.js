const tableItem = {
    date: "2021-10-5",
    name: "广园",
    phone: "18970942882",
    address: "南昌航空大学"
}

// 以tableItem为数据源拷贝20条数据，同时根据index生成id, id=index+1
const tableData = Array(20).fill(tableItem).map((item, index) => {
    return {...item, id: index + 1 }
});
export default tableData;