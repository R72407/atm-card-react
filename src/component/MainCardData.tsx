import * as React from 'react';
import { creditMask } from './utils';
import { Rotate, Edit, MasterCardLogo, VisaLogo, MaestroLogo, AmericanExpressLogo, JCBLogo, DinersClubLogo, MirLogo, Chip } from './icons';
import { MainCardDataProps } from '../index.d';
import DateField from './DateField';
import NumberField from './NumberField';
import HolderField from './HolderField';

const MainCardData = (props: MainCardDataProps) => {
    const card = React.useRef<any>(null);
    const [numberEdit, setNumberEdit] = React.useState<boolean>(false);
    const [holderEdit, setHolderEdit] = React.useState<boolean>(false);
    const [dateEdit, setDateEdit] = React.useState<boolean>(false);

    const handleClick = (e: any) => {
        if (card.current.contains(e.target)) return;
        setNumberEdit(false);
        setDateEdit(false);
        setHolderEdit(false);
    }

    const getSystemLogo = () => {
        switch (props.system) {
            case 'mastercard':
                return <MasterCardLogo size={80 * (props.scale ? props.scale : 1)}/>;
            case 'visa':
                return <VisaLogo size={80 * (props.scale ? props.scale : 1)}/>;
            case 'maestro':
                return <MaestroLogo size={65 * (props.scale ? props.scale : 1)}/>;
            case 'americanexpress':
                return <AmericanExpressLogo size={100 * (props.scale ? props.scale : 1)}/>;
            case 'jcb':
                return <JCBLogo size={70 * (props.scale ? props.scale : 1)}/>;
            case 'dinersclub':
                return <DinersClubLogo size={70 * (props.scale ? props.scale : 1)}/>;
            case 'mir':
                return <MirLogo size={100 * (props.scale ? props.scale : 1)}/>;
            default:
                return null;
        }
    }

    React.useEffect(() => {
        if (props.number.length === 16) setNumberEdit(false)
        document.addEventListener('mousedown', handleClick, true);

        return () => {
            document.removeEventListener("mousedown", handleClick, true);
        }
    }, [props.number])

    return (
        <div className="component-atm-card"
            ref={card} 
            style={{ 
                backgroundImage: props.image ? `url(${props.image})` : '',
                backgroundColor: props.bgColor ? props.bgColor : '',
                width: 430 * (props.scale ? props.scale : 1),
                height: 270 * (props.scale ? props.scale : 1)
            }}>
            <div className="component-atm-card-bank">{props.bankLogo}</div>
            <div className="component-atm-card-controls">
                <i onClick={() => props.onRotate()}>
                    <Rotate size={34 * (props.scale ? props.scale : 1)} color={props.dataColor ? props.dataColor : ''}/>
                </i>
            </div>
            
            <NumberField
                hideDigits={props.hideDigits}
                number={props.number}
                scale={props.scale}
                dataColor={props.dataColor}
                onChange={props.onChange}
                numberEdit={numberEdit}
                onNumberEdit={(flag: boolean) => setNumberEdit(flag)}/>

            <HolderField
                holderName={props.holderName}
                onHolderEdit={(flag: boolean) => setHolderEdit(flag)}
                holderEdit={holderEdit}
                scale={props.scale}
                dataColor={props.dataColor}
                onChange={props.onChange}/>

            <DateField
                date={props.date}
                onChange={props.onChange}
                scale={props.scale}
                dateEdit={dateEdit}
                onDateEdit={(flag: boolean) => setDateEdit(flag)} 
                dataColor={props.dataColor}/>
            <div className="component-atm-card-system-logo">{getSystemLogo()}</div>
        </div>
    )
}
export default MainCardData;