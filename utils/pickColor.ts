import { ColorOptions } from "@/typings";

const pickColor = (isPositive: boolean): ColorOptions => {
    if (isPositive) {
        return {background: "39, 208, 208", border: "rgba(39, 208, 208, 1)"};
    } else {
        return {background: "254, 35, 100", border: "rgba(254, 35, 100, 1)"};
    }
};
export default pickColor;