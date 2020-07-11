
export const pathGet = (data, query) => {
  // TASK 1: 
  // Write a function that searches through the input array / object
  // and returns the appropriate string path leading to the input query, if found
  // Example:
  // const a = {
  //    user: {
  //      id: 1,
  //      name: {
  //        firstName: "James",
  //        lastName: "Ibori"
  //      },
  //      location: {
  //        city: "Ikoyi",
  //        state: "Lagos",
  //        address: "One expensive house like that"
  //      }
  //    }
  // }
  // `pathGet(a, 'One expensive house like that')` = "a.user.location.address"
  // `pathGet(a, 'James')` = "a.user.name.firstName"

  // ============== CODE GOES BELOW THIS LINE :) ==============

    let result = ''
    const searchObject = (data, path='') => {
        for(const value in data) {
          if (data[value] === query) {
            return `${path}.${value}`;
          }
          if (typeof data[value] === 'string') {continue};
          const search = searchObject(data[value], query, `${path}.${value}`);
          if (search) {
            return search 
          }
        }
    }
    searchObject(data, query, 'data');
}