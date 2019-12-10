export default {
    api: {
        accessDenied: new Error('accessDenied'),
        invalidAccessToken: new Error('invalidAccessToken'),
        expiredAccessToken: new Error('expiredAccessToken')
    },

    accounts: {
        invalidIdNumber: new Error('invalidIdNumber'),
        idNumberNotMatch: new Error('idNumberNotMatch'),
        invalidPersonalNumber: new Error('invalidPersonalNumber'),
        personalNumberNotMatch: new Error('personalNumberNotMatch'),
        invalidHogerNumber: new Error('invalidHogerNumber'),
        hogerNumberNotMatch: new Error('hogerNumberNotMatch'),
        invalidPhoneNumber: new Error('invalidPhoneNumber'),
        invalidName: new Error('invalidName'),
        invalidBirthDate: new Error('invalidBirthDate'),
        passwordTooWeak: new Error('passwordTooWeak'),
        passwordNotMatch: new Error('passwordNotMatch'),
        userNotExist: new Error('userNotExist'),
        paramsNotMatch: new Error('paramsNotMatch')
    },

    reviews: {
        invalidTitle: new Error('invalidTitle'),
        invalidDescription: new Error('invalidDescription')
    },

    courses: {
        invalidName: new Error('invalidTitle'),
        invalidDescription: new Error('invalidDescription'),
        invalidCoreFileLink: new Error('invalidCoreFileLink'),
        invalidDates: new Error('invalidDates'),
        invalidTags: new Error('invalidTags'),
        courseIsClose: new Error('courseIsClose')
    },

    posts: {
        invalidContent: new Error('invalidContent')
    }
}