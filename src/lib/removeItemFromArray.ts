
const removeDeviceFromArray = (item:string, itemArray:string[]):string[]=>{
    const index = itemArray.indexOf(item);
    if (index > -1) 
        itemArray.splice(index, 1);
    return  itemArray 
}

export default removeDeviceFromArray