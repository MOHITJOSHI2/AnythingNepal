const HandleCorrections1 = (data) => {
    const { fullName, phone, gender, age, district, city, address, email, password, confirmPassword } = data
    const errors = {}
    if (fullName.length < 5) {
        errors.fullName = "full name cannot be less than 5 letters"
        errors.page = 1
    }
    if (phone.length != 10) {
        errors.phone = "Phone number must be of 10 numbers"
        errors.page = 1
    }
    if (!gender) {
        errors.gender = "Please specify your Gender"
        errors.page = 1
    }
    if (age < 12) {
        errors.age = "Cannot be below than 12"
        errors.page = 1
    }
    if (!district) {
        errors.district = "District cannot be null"
        errors.page = 1
    }
    if (!city) {
        errors.city = "City cannot be null"
        errors.page = 1
    }
    if (!address) {
        errors.address = "Address cannot be null"
        errors.page = 1
    }
    if (!errors.fullName || !errors.phone || !errors.gender || !errors.age || !errors.district || !errors.city || !errors.address) {

        if (!email) {
            errors.email = "Email cannot be null"
            errors.page = 2
        }
        if (!password) {
            errors.password = "Password cannot be null"
            errors.page = 2
        }
        if (!confirmPassword) {
            errors.confirmPassword = "This field cannot be null"
            errors.page = 2
        }
        if (password != confirmPassword) {
            errors.password = "Password Doesn't match"
            errors.page = 2
        }
    }
    return errors
}


const HandleCorrections2 = (data) => {
    const { email, password } = data
    if (!email) {
        errors.email = "Email cannot be null"
    }
    if (!password) {
        errors.password = "Password cannot be null"
    }
}
export default { HandleCorrections1, HandleCorrections2 };