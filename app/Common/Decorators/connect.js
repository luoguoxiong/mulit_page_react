import { connect } from 'dva'

export default function connectDecorate(mapStateToProps, mapDispatchToProps) {
  return function decorate(target) {
    return connect(
      mapStateToProps,
      mapDispatchToProps,
      void 0,
      { pure: false }
    )(target)
  }
}
