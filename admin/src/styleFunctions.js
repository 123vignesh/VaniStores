var IconStyling = {
    styleListIcon: {
        cursor: "pointer",
        fontSize: "25px",

        color: "#008080"

    },
    styleListShopIcon: {
        cursor: "pointer",
        fontSize: "40px",

        color: "#008080",
    },
    styleListStar: {

        fontSize: "20px",
        paddingTop: "22px",
        color: "green"

    },
    styleListStarDetail: {

        fontSize: "28px",
        paddingTop: "2px",
        color: "green"

    },
    styleUploadIcon: {
        cursor: "pointer",
        fontSize: "100px",
        color: "var(--Quarterinar-color)"

    },
    styleUploadIconHidden: {
        display: "none"
    },
    SmallImage: {
        display: "none"
    },
    SmallImageHidden: {
        display: "normal"
    },


    SideBarHidden: {
        display: "none",

    },
    SideBarVisible: {

        opacity: 1,
        transition: "linear 200ms, opacity 300ms"
    },


    SelectOption: {

        control: () => ({

            marginBottom: "25px",
            padding: "10px",
            border: "1px solid var(--Quarterinary-color)",
            backgroundColor: "white",
            borderRadius: "10px",
            fontWeight: 600,
            fontSize: "large",
            color: "black",
            boxShadow: `0 1rem 1.25rem 0 #12151a,
            0 -0.25rem 1.5rem var(--Secondary-color) inset,
            0 0.1rem 0rem #ffffff66 inset, 0 0.2rem 0.5rem 0 var(--Primary-color) inset`
        })

    },
    SelectOptionOrder: {

        control: () => ({
            margin: "20px",
            marginBottom: "25px",
            padding: "15px",

            backgroundColor: "white",
            borderRadius: "5px",
            fontSize: "large",
            color: "black",

            minWidth: "400px",
            minHeight: "20px",
            boxShadow: `0 1rem 1.25rem 0 #12151a,
            0 -0.25rem 1.5rem var(--Secondary-color) inset,
            0 0.1rem 0rem #ffffff66 inset, 0 0.2rem 0.5rem 0 var(--Primary-color) inset`
        })

    }


}

export default IconStyling;