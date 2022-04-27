export const RoundedImageBig = ({ source }: any) => {
    return (                       
        <div className="w-16 h-16 rounded-full shadow-sm">
            <img className="w-full h-full rounded-full object-cover" src={source}></img>
        </div>
    )
}

export const RoundedImageSmall = ({ source }: any) => {
    return (                       
        <div className="w-14 h-14 rounded-full shadow-sm">
            <img className="w-full h-full rounded-full object-cover" src={source}></img>
        </div>
    )
}