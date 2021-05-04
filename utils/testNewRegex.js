const regex1 = / [0-9][1,0]?($|\s)/ ;
const myString = "Pokemon Fossil 1st Edition Complete Common/Uncommon Set 31-62 NEAR MINT (NM) $299.95 $284.95"

const letsgo = regex1.exec(myString)

console.log(letsgo)