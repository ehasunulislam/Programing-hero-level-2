/* API responses can be unpredictable.
 You need to safely access a deep
property without causing a crash. */

// Write a function getZipCode that reaches deep into the object.
// If any part of the path is missing, or if the zipCode is null/undefined, return "00000".

type UserResponse = {
  info?: {
    address?: {
      zipCode?: string;
    };
  };
};


function getZipCode(user: UserResponse): string {
    return user?.info?.address?.zipCode ?? "00000"
}

// const result1 = getZipCode({
//   info: {
//     address: {
//       zipCode: "1207"
//     }
//   }
// });

// console.log(result1); 