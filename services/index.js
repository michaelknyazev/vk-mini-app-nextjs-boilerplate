const Services = {}

export const GetEnvNames = () => Object.keys(Services).map(_s => Services[_s].ENV_NAME)

export default Services;