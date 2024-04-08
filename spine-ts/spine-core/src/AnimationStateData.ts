import { SkeletonData } from "./SkeletonData"
import { StringMap } from "./Utils"
import { Animation } from "./Animation"

/** Stores mix (crossfade) durations to be applied when {@link AnimationState} animations are changed. */
export class AnimationStateData {
  /** The SkeletonData to look up animations when they are specified by name. */
  skeletonData: SkeletonData

  animationToMixTime: StringMap<number> = {}

  /** The mix duration to use when no mix duration has been defined between two animations. */
  defaultMix = 0

  constructor(skeletonData: SkeletonData) {
    if (skeletonData == null) throw new Error("skeletonData cannot be null.")
    this.skeletonData = skeletonData
  }

  /** Sets a mix duration by animation name.
   *
   * See {@link #setMixWith()}. */
  setMix(fromName: string, toName: string, duration: number) {
    let from = this.skeletonData.findAnimation(fromName)
    if (from == null) throw new Error("Animation not found: " + fromName)
    let to = this.skeletonData.findAnimation(toName)
    if (to == null) throw new Error("Animation not found: " + toName)
    this.setMixWith(from, to, duration)
  }

  /** Sets the mix duration when changing from the specified animation to the other.
   *
   * See {@link TrackEntry#mixDuration}. */
  setMixWith(from: Animation, to: Animation, duration: number) {
    if (from == null) throw new Error("from cannot be null.")
    if (to == null) throw new Error("to cannot be null.")
    let key = from.name + "." + to.name
    this.animationToMixTime[key] = duration
  }

  /** Returns the mix duration to use when changing from the specified animation to the other, or the {@link #defaultMix} if
   * no mix duration has been set. */
  getMix(from: Animation, to: Animation) {
    let key = from.name + "." + to.name
    let value = this.animationToMixTime[key]
    return value === undefined ? this.defaultMix : value
  }
}
