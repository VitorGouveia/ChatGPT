// const cpfInput = document.querySelector("#socialSecurity")

// const mask = (masks, max, event) => {
//   var c = event.target;
// 	var v = c.value.replace(/\D/g, '');
// 	var m = c.value.length > max ? 1 : 0;
// 	VMasker(c).unMask();
// 	VMasker(c).maskPattern(masks[m]);
// 	c.value = VMasker.toPattern(v, masks[m]);
// }

// const cpfMask = ['999.999.999-999', '99.999.999/9999-99'];

// VMasker(cpfInput).maskPattern(cpfMask[0])
// cpfInput.addEventListener("input", mask.bind(undefined, cpfMask, 14))