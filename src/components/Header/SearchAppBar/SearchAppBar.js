import React, {useCallback, useMemo, useState} from "react";
import cn from "classnames/bind";
import styles from "./SearchAppBar.scss";
import _ from "lodash";
import {NavLink} from "react-router-dom";
import {useHistory} from "src/hooks";
//  components
import SearchArea from "src/components/common/SearchArea";
import {Toolbar} from "@material-ui/core";

import consts from "src/constants/consts";

import dropdownArrow from "src/assets/common/dropdown_arrow.svg";
import hschain from "src/assets/header/chain_ic.svg";
import iris from "src/assets/header/iris_token.svg";
import kava from "src/assets/header/kava_token.svg";
import cosmos from "src/assets/header/atom_token.svg";
import logo from "src/assets/header/hstlogo.png";
import hschain_devnet from "src/assets/header/hschain_devnet.png";

const cx = cn.bind(styles);

// const avaliableNetworks = ["cosmos", "iris", "kava", "hschain"];
const avaliableNetworks = ["hschain"];
// const tokenImg = [cosmos, iris, kava, hschain];
const tokenImg = [hschain_devnet];

export default function(props) {
	const history = useHistory();
	const [open, setOpen] = useState(false);

	const toMain = useCallback(() => history.push("/"), [history]);

	// const handleChange = useCallback(
	// 	network => {
	// 		if (network === "cosmos") window.open(consts.MINTSCAN_URL.COSMOS, "_blank");
	// 		else if (network === "kava") window.open(consts.MINTSCAN_URL.KAVA, "_blank");
	// 		else if (network === "iris") window.open(consts.MINTSCAN_URL.IRIS, "_blank");
	// 		setOpen(v => !v);
	// 	},
	// 	[setOpen]
	// );

	const handleChange = useCallback(
		network => {
			history.push("/");
			setOpen(v => !v);
		},
		[setOpen]
	);

	const render = useCallback(
		open => {
			console.count("AppBar rerender");
			return (
				<div className={cx("SearchAppBar-root")} id={"Header-fixed-id"}>
					<Toolbar className={cx("toolbar")}>
						<NavLink to='/' onClick={toMain}>
							<img src={logo} alt={"logo"} />
						</NavLink>
						<div className={cx("select-wrapper")}>
							<div className={cx("net-select-wrapper")}>
								<button className={cx("select-btn")} onClick={() => setOpen(v => !v)}>
									<div className={cx("curr-net-wrapper")}>
										<div className={cx("net-icon")} style={{backgroundImage: `url(${tokenImg[0]})`}} />
										{/* {consts.NETWORK.HSCHAIN} */}
										hschain
									</div>
									<img className={cx("arrow-icon", {upsideDown: open})} src={dropdownArrow} alt={"none"} />
								</button>
								<div className={cx("select-item-list", {hide: !open})}>
									{_.map(avaliableNetworks, (network, idx) => (
										<div className={cx("select-item")} key={network} onClick={() => handleChange(network)}>
											<div className={cx("net-icon")} style={{backgroundImage: `url(${tokenImg[idx]}`}} />
											{(() => {
												switch (network) {
													case "iris":
														return consts.NETWORK.IRIS;
													case "kava":
														return consts.NETWORK.KAVA;
													case "hschain":
														return consts.NETWORK.HSCHAIN;
													case "hschain":
														return "hschain";
													default:
														return consts.NETWORK.COSMOS;
												}
											})()}
										</div>
									))}
									{/* {_.map(avaliableNetworks, (network, idx) => (
										<div className={cx("select-item")} key={network} onClick={() => handleChange(network)}>
											<div className={cx("net-icon")} style={{backgroundImage: `url(${tokenImg[idx]}`}} />
											{(() => {
												console.log(idx);
												console.log(consts);
												switch (network) {
													case "iris":
														return consts.NETWORK.IRIS;
													case "kava":
														return consts.NETWORK.KAVA;
													case "hschain":
														return consts.NETWORK.HSCHAIN;
													default:
														return consts.NETWORK.COSMOS;
												}
											})()}
										</div>
									))} */}
								</div>
							</div>
							<SearchArea propCx={cx} dropdownStyle={{position: "fixed", width: "459px"}} />
						</div>
					</Toolbar>
				</div>
			);
		},
		[toMain, handleChange]
	);
	return useMemo(() => render(open), [render, open]);
}
