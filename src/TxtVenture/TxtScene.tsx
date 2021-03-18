import "./TxtScene.css";
import React from "react";
import { TxtActionHandler, TxtActionEvent } from "./TxtAction";
import { Identifiable } from "./TxtTools";
import { TxtVentureRenderObject } from "./TxtVenture";
import { TxtObjectOwnerImpl } from "./TxtObject";

export abstract class TxtSceneProps<TxtObjectId, TxtSceneId>
  extends TxtObjectOwnerImpl<TxtObjectId>
  implements TxtActionHandler<TxtObjectId>, Identifiable<TxtSceneId> {
  abstract id: TxtSceneId;
  abstract title: string;
  abstract text: (txt: TxtVentureRenderObject<TxtObjectId>) => React.ReactNode;
  onOpen?: (event: TxtActionEvent<TxtObjectId>) => void;
  onClose?: (event: TxtActionEvent<TxtObjectId>) => void;
  onPush?: (event: TxtActionEvent<TxtObjectId>) => void;
  onPull?: (event: TxtActionEvent<TxtObjectId>) => void;
  onWalkTo?: (event: TxtActionEvent<TxtObjectId>) => void;
  onPickUp?: (event: TxtActionEvent<TxtObjectId>) => void;
  onTalkTo?: (event: TxtActionEvent<TxtObjectId>) => void;
  onGive?: (event: TxtActionEvent<TxtObjectId>) => void;
  onUse?: (event: TxtActionEvent<TxtObjectId>) => void;
}

interface Props<TxtObjectId, TxtSceneId> {
  scene: TxtSceneProps<TxtObjectId, TxtSceneId>;
  txt: TxtVentureRenderObject<TxtObjectId>;
}

interface State {
}

export class TxtScene<TxtObjectId, TxtSceneId> extends React.Component<Props<TxtObjectId, TxtSceneId>, State> {
  constructor(props: Props<TxtObjectId, TxtSceneId>) {
    super(props);
    this.state = {};
  }

  render() {
    return <div className="TxtScene">
      <h2>{this.props.scene.title}</h2>
      {this.props.scene.text(this.props.txt)}
    </div>;
  }
}

export default TxtScene;
