import {Menu , Blocks} from "lucide-react";

const Navbar = () => {
    return (
        <header className="mx-auto flex max-w-[1180px] items-center justify-between px-8 py-4">

            {/* Logo */}

            <div className="flex items-center gap-1.5">

                <div className="relative flex h-[31px] w-[31px] justify-center">

                    <Blocks size={28} strokeWidth={2} />
                    {/* <LogosIcon /> */}

                </div>

                <span className="text-[20px] font-semibold tracking-[-0.03em]">
                    ONEFLOW
                </span>

            </div>

            {/* Right */}

            <div className="flex items-center gap-[18px]">

                <button className="cursor-pointer rounded-[5px] border-0 bg-[#FF8067] px-[17px] py-2 text-[11px] font-bold text-[#151216] transition hover:bg-[#ff927d]">
                    Sign In/Up
                </button>

                {/* <Menu
                    size={19}
                    className="text-[#D5D5D9]"
                /> */}

            </div>

        </header>
    )
}

export default Navbar
