import Resizer from "react-image-file-resizer";

const ImageResizer = {

    imageResizer(file, values, setValues){

        try {

            Resizer.imageFileResizer(
                file,
                400,
                400,
                "JPEG",
                100,
                0,
                (uri) => {
                    // console.log(uri);
                    setValues({...values, data: uri});
    
    
                },
                "base64",
                300, 300
            )
            
        } catch (error) {
            console.log(error);
        }

    },

    editImageResizer(file, setData){
        try {

            Resizer.imageFileResizer(
                file,
                400,
                400,
                "JPEG",
                100,
                0,
                (uri) => {
                    // console.log(uri);
                    setData(uri);
    
    
                },
                "base64",
                300, 300
            )
            
        } catch (error) {
            console.log(error);
        }

    }

}

export default ImageResizer;

export const imageResizer = (file, values, setValues) => {

    try {

        Resizer.imageFileResizer(
            file,
            400,
            400,
            "JPEG",
            100,
            0,
            (uri) => {
                // console.log(uri);
                setValues({...values, data: uri});


            },
            "base64",
            300, 300
        )
        
    } catch (error) {
        console.log(error);
    }

}