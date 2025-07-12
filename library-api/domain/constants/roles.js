export const Roles = Object.freeze({ //nesne değiştirilemez (immutable) hale getirildi
    ADMIN: "admin",
    LIBRARIAN: "librarian",
    MEMBER: "member"
})

//onst ile değişken referansını sabitliyoruz.
//Object.freeze() ile ise nesnenin içeriğini sabitliyoruz.