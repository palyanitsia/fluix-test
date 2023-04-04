export const Image = ({media}) => {
  // console.log(media.sizes)
  return <img className="mt-8" src={media.url} alt={media.name}/>;
}
