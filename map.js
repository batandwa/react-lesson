const ages = [10,20,40];

function doubleAge(age) {
    return age * 2;
}

let doubledAges = [];
doubledAges.push(44);

for(let i=0; i < ages.length; i++) {
    const age = ages[i];
    doubledAges.push(doubleAge(age))
}

doubledAges = ages.map(doubleAge);
doubledAges = ages.map(age => age * 2);



console.log(doubledAges)