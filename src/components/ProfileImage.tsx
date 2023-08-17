import Image from "next/image";

type ProfileImageProps = {
  src?: string | null;
  className?: string;
};

export function ProfileImage({ src, className = "" }: ProfileImageProps) {
  return (
    <div className={`relative  overflow-hidden rounded-full ${className}`}>
      {src == null ? (
        <div></div>
      ) : (
        <Image
          src={src}
          alt="Profile Image"
          quality={100}
          width={150}
          height={150}
          priority
        />
      )}
    </div>
  );
}
